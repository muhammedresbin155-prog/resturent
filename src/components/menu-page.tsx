"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { artworkFor, descriptionFor } from "@/lib/menu-assets";
import type { MenuItem } from "@/lib/items";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const icon = (value: string, className = "") => <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>{value}</span>;

function MenuCard({ item }: { item: MenuItem }) {
  const { cart, addToCart, setQuantity } = useCart();
  const inCart = cart[item.id] ?? 0;
  const artwork = artworkFor(item.name, item.category, item.id);
  const soldOut = item.stock <= 0;
  const lowStock = !soldOut && item.stock <= 4;
  return (
    <article className={`menu-card${soldOut ? " sold-out" : ""}`}>
      <div className="dish-photo">
        <img src={artwork.image} alt={item.name} loading="lazy" />
        <span className="category-tag">{item.category}</span>
        {soldOut && <span className="sold-tag">Sold Out</span>}
      </div>
      <div className="dish-content">
        <div className="dish-information">
          <p className={`stock-line ${soldOut ? "stock-none" : lowStock ? "stock-low" : ""}`}>
            <span className="stock-dot" />{soldOut ? "Out of Stock" : `${inCart ? `${inCart} in cart · ` : ""}In Stock: ${item.stock}`}
          </p>
          <h2 title={item.name}>{item.name}</h2>
          <p className="dish-description">{descriptionFor(item.name)}</p>
        </div>
        <div className="dish-controls">
          <div className="dish-price-row">
            <strong className="dish-price">{currency.format(item.price)}</strong>
            <div className="stepper" style={{ visibility: inCart > 0 ? "visible" : "hidden" }} aria-hidden={inCart === 0} aria-label={`Quantity of ${item.name}`}>
              <button type="button" aria-label="Decrease quantity" disabled={inCart <= 0} onClick={() => setQuantity(item.id, inCart - 1)}>{icon("remove")}</button>
              <span>{inCart}</span>
              <button type="button" aria-label="Increase quantity" disabled={soldOut || inCart >= item.stock} onClick={() => setQuantity(item.id, inCart + 1)}>{icon("add")}</button>
            </div>
          </div>
          {inCart === 0 && <button className="add-button" type="button" disabled={soldOut} onClick={() => addToCart(item, 1)}>
            {icon(soldOut ? "block" : "add_shopping_cart")}{soldOut ? "Unavailable" : "Add to Cart"}
          </button>}
        </div>
      </div>
    </article>
  );
}

export function MenuPage() {
  const { items, itemsLoading, itemsError, cartCount, cartTotal, refreshItems } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = useMemo(() => [...new Set(items.map((item) => item.category))], [items]);
  const visibleItems = useMemo(() => items.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesQuery = `${item.name} ${item.category} ${descriptionFor(item.name)}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
    return matchesCategory && matchesQuery;
  }), [items, activeCategory, query]);

  return (
    <main className="menu-main">
      <div className="page-width menu-page">
        <div className="menu-heading">
          <div>
            <div className="eyebrow"><span />Daily Kitchen Roster</div>
            <h1>Curated Menu</h1>
            <p className="menu-count" aria-live="polite">{itemsLoading ? "Loading today's selections" : itemsError ? "Menu unavailable" : `Showing ${visibleItems.length} culinary selection${visibleItems.length === 1 ? "" : "s"}`}</p>
          </div>
          <label className="search-box">
            {icon("search")}
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes, ingredients, or grill specials..." aria-label="Search menu" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">{icon("close")}</button>}
          </label>
        </div>

        {!itemsError && !itemsLoading && items.length > 0 && <div className="filters" aria-label="Menu categories">
          {["All", ...categories].map((category) => <button key={category} type="button" className={activeCategory === category ? "selected" : ""} onClick={() => setActiveCategory(category)}>
            {category}<span>({category === "All" ? items.length : items.filter((item) => item.category === category).length})</span>
          </button>)}
        </div>}

        {itemsLoading && <div className="state-panel"><span className="loading-mark" /><h2>Preparing the menu</h2><p>Loading today's selections from the kitchen.</p></div>}
        {!itemsLoading && itemsError && <div className="state-panel error-panel"><h2>We couldn’t load the menu</h2><p>{itemsError}</p><button type="button" className="secondary-button" onClick={() => void refreshItems().catch(() => undefined)}>Try again</button></div>}
        {!itemsLoading && !itemsError && items.length === 0 && <div className="state-panel"><h2>Today's menu is empty</h2><p>There are no items available right now. Please check back soon.</p></div>}
        {!itemsLoading && !itemsError && items.length > 0 && (visibleItems.length > 0
          ? <div className="menu-grid">{visibleItems.map((item) => <MenuCard key={item.id} item={item} />)}</div>
          : <div className="state-panel"><h2>No culinary matches found</h2><p>Try another search or choose a different category.</p><button type="button" className="secondary-button" onClick={() => { setActiveCategory("All"); setQuery(""); }}>Reset Search &amp; Filters</button></div>)}
      </div>
      {cartCount > 0 && <aside className="floating-cart">
        <Link href="/cart">
          <span className="floating-bag">{icon("shopping_bag")}</span>
          <span className="floating-order"><small>Order Total</small><strong>{currency.format(cartTotal)}</strong></span>
          <i />
          <span className="floating-count">{cartCount} {cartCount === 1 ? "Item" : "Items"}</span>
          {icon("arrow_forward")}
        </Link>
      </aside>}
    </main>
  );
}
