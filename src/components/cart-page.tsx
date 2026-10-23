"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { artworkFor } from "@/lib/menu-assets";
import type { MenuItem } from "@/lib/items";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const itemMoney = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
const icon = (value: string, className = "") => <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>{value}</span>;

function CartLine({ id, item, quantity, unavailable, disabled }: { id: string; item?: MenuItem; quantity: number; unavailable: boolean; disabled: boolean }) {
  const { setQuantity, removeFromCart } = useCart();
  const fallbackName = item?.name ?? "Menu item no longer available";
  const artwork = item ? artworkFor(item.name, item.category, item.id) : null;
  return (
    <article className="cart-line">
      <div className="cart-item-info">
        <div className="cart-photo">{artwork ? <img src={artwork.image} alt={item?.name ?? ""} /> : icon("restaurant")}</div>
        <div className="cart-item-copy">
          <div className="cart-meta"><span>{item?.category ?? "Unavailable"}</span><i>•</i><span>{item ? `${itemMoney(item.price)} each` : "Please remove this item"}</span></div>
          <h2>{fallbackName}</h2>
          <p className={unavailable ? "stock-warning" : ""}>{unavailable ? "Not available at the requested quantity" : item ? `(Max ${item.stock} available)` : "This item is missing from the current menu."}</p>
        </div>
      </div>
      <div className="cart-line-actions">
        <div className="stepper cart-stepper" aria-label={`Quantity of ${fallbackName}`}>
          <button type="button" aria-label="Decrease quantity" disabled={disabled || quantity <= 1} onClick={() => setQuantity(id, quantity - 1)}>{icon("remove")}</button>
          <span>{quantity}</span>
          <button type="button" aria-label="Increase quantity" disabled={disabled || !item || quantity >= item.stock} onClick={() => setQuantity(id, quantity + 1)}>{icon("add")}</button>
        </div>
        <strong className="line-total">{itemMoney((item?.price ?? 0) * quantity)}</strong>
        <button type="button" aria-label={`Remove ${fallbackName}`} className="remove-line" disabled={disabled} onClick={() => removeFromCart(id)}>{icon("delete")}</button>
      </div>
    </article>
  );
}

function confirmed(payload: unknown): boolean {
  if (!payload || typeof payload !== "object") return false;
  const object = payload as Record<string, unknown>;
  if (object.success === false || object.ok === false || (typeof object.status === "string" && /^(error|failed)$/i.test(object.status)) || (typeof object.error === "string" && object.error.trim())) return false;
  if (object.data && typeof object.data === "object") return confirmed(object.data);
  if (object.success === true || object.ok === true) return true;
  return [object.status, object.result, object.message].some((value) => typeof value === "string" && /^(success|ok|created|added|order placed)$/i.test(value.trim()));
}

function failureMessage(payload: unknown) {
  if (payload && typeof payload === "object") {
    const object = payload as Record<string, unknown>;
    for (const value of [object.error, object.message, object.details]) {
      if (typeof value === "string" && value.trim()) return value;
    }
    if (object.data && typeof object.data === "object") return failureMessage(object.data);
  }
  return "The kitchen did not confirm this item.";
}

export function CartPage() {
  const { cart, items, itemsLoading, itemsError, refreshItems, removeCartItems } = useCart();
  const [processing, setProcessing] = useState(false);
  const [orderNotice, setOrderNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    void refreshItems().catch(() => undefined);
  }, [refreshItems]);

  const lines = useMemo(() => Object.entries(cart).map(([id, quantity]) => ({
    id,
    quantity,
    item: items.find((candidate) => candidate.id === id),
  })), [cart, items]);
  const subtotal = lines.reduce((sum, line) => sum + (line.item?.price ?? 0) * line.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  const unitCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const hasStockIssue = lines.some((line) => !line.item || line.quantity > line.item.stock || line.item.stock <= 0);

  const placeOrder = async () => {
    if (processing || !lines.length) return;
    setProcessing(true);
    setOrderNotice(null);
    let latest: MenuItem[];
    try {
      latest = await refreshItems();
    } catch {
      setOrderNotice({ type: "error", text: "We couldn’t verify current stock. Your order was not submitted. Please try again when the menu is available." });
      setProcessing(false);
      return;
    }

    const invalid = lines.map((line) => ({ ...line, latestItem: latest.find((candidate) => candidate.id === line.id) }))
      .find((line) => !line.latestItem || line.quantity > line.latestItem.stock);
    if (invalid) {
      const itemName = invalid.latestItem?.name ?? invalid.item?.name ?? "An item in your cart";
      setOrderNotice({ type: "error", text: `${itemName} is no longer available in the requested quantity. Review the updated stock and adjust your cart before ordering.` });
      setProcessing(false);
      return;
    }

    const batch = `ORD${Date.now()}${crypto.randomUUID().replaceAll("-", "").slice(0, 8)}`;
    const succeeded: string[] = [];
    let failedLine: (typeof lines)[number] | undefined;
    let reason = "";
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      const item = latest.find((candidate) => candidate.id === line.id)!;
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tab: "orders", action: "add", data: { "order id": `${batch}-${index + 1}`, "item id": item.id, quanty: line.quantity } }),
        });
        const payload: unknown = await response.json();
        if (!response.ok) throw new Error(failureMessage(payload));
        if (!confirmed(payload)) throw new Error(failureMessage(payload));
        succeeded.push(line.id);
      } catch (error) {
        failedLine = line;
        reason = error instanceof Error ? error.message : "The kitchen did not confirm this item.";
        break;
      }
    }

    if (succeeded.length) removeCartItems(succeeded);
    if (failedLine) {
      const failedItem = latest.find((item) => item.id === failedLine?.id)?.name ?? "An item";
      setOrderNotice({ type: "error", text: succeeded.length
        ? `${failedItem} failed: ${reason} ${succeeded.length} other item${succeeded.length === 1 ? " was" : "s were"} already placed successfully and removed from your cart. Please review before submitting again.`
        : `${failedItem} could not be ordered: ${reason} No items were confirmed as placed; verify with the kitchen before retrying.` });
    } else {
      setOrderNotice({ type: "success", text: "Order placed successfully. The kitchen has confirmed every item." });
    }
    try {
      await refreshItems();
    } catch {
      setOrderNotice((current) => current?.type === "success"
        ? { ...current, text: `${current.text} Stock could not be refreshed just now; reload the menu to see the latest availability.` }
        : current);
    }
    setProcessing(false);
  };

  return (
    <main className="cart-main">
      <div className="page-width cart-page">
        <Link className="back-link" href="/">{icon("arrow_back")} Back to Menu</Link>
        <div className="cart-heading"><h1>Your Cart &amp; Order Review</h1><p>({unitCount} {unitCount === 1 ? "item" : "items"} selected)</p></div>

        {itemsError && <div className="inline-alert error-alert" role="alert"><p>Current stock could not be refreshed: {itemsError}</p><button className="text-button" type="button" onClick={() => void refreshItems().catch(() => undefined)}>Try again</button></div>}
        {orderNotice && <div className={`inline-alert ${orderNotice.type === "success" ? "success-alert" : "error-alert"}`} role="status">{icon(orderNotice.type === "success" ? "check_circle" : "error")}<p>{orderNotice.text}</p></div>}

        {lines.length === 0 ? <div className="empty-cart">
          <div className="empty-cart-icon">{icon("production_quantity_limits")}</div>
          <h2>Your cart is currently empty</h2>
          <p>Explore our artisanal seasonal menu, freshly prepared grill specialties, and cold-pressed elixirs.</p>
          <Link className="primary-button" href="/">{icon("arrow_back")} Return to Menu</Link>
        </div> : <div className="cart-layout">
          <section className="cart-items-column" aria-label="Selected items">
            <div className="cart-lines">
              {lines.map((line) => {
                const item = line.item;
                const unavailable = !item || line.quantity > (item?.stock ?? 0) || (item?.stock ?? 0) <= 0;
                return <CartLine key={line.id} id={line.id} item={item} quantity={line.quantity} unavailable={unavailable} disabled={processing || itemsLoading} />;
              })}
            </div>
            {hasStockIssue && <p className="stock-note error-note">Some items exceed the latest available stock. Adjust the quantities before placing your order.</p>}
            <div className="allocation-note">{icon("verified")}<div><strong>Real-Time Kitchen Allocation</strong><p>Items in your cart are checked against live stock when you place your order. Orders are sent directly to the kitchen.</p></div></div>
          </section>

          <aside className="summary-column">
            <section className="summary-card">
              <header><h2>Order Summary</h2>{icon("receipt_long")}</header>
              <div className="summary-rows">
                <div><span>Subtotal ({unitCount} {unitCount === 1 ? "item" : "items"})</span><strong>{money(subtotal)}</strong></div>
                <div><span>Restaurant GST &amp; Taxes <b>5%</b></span><strong>{money(tax)}</strong></div>
                <div><span>Packaging &amp; Delivery</span><strong className="free-label">Free</strong></div>
              </div>
              <div className="payable-row"><span><strong>Total Payable</strong><small>Inclusive of all duties</small></span><strong>{money(total)}</strong></div>
              <div className="inventory-note">{icon("inventory_2")}<span className="inventory-note-text">Placing this order immediately reduces live kitchen inventory.</span></div>
              <button className="place-order-button" type="button" disabled={!lines.length || processing || itemsLoading || hasStockIssue || !!itemsError} onClick={placeOrder}>
                {processing ? "Placing Order…" : `Place Order · ${money(total)}`}{!processing && icon("east")}
              </button>
              <p className="pickup-note">{icon("eco")}Freshly prepared upon confirmation · Contactless pickup</p>
            </section>
            <div className="quality-note"><span>{icon("shield")}</span><div><strong>Guaranteed Quality Assurance</strong><p>Direct from kitchen to table in optimal thermal packaging.</p></div></div>
          </aside>
        </div>}
      </div>
    </main>
  );
}
