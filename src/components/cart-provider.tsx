"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { MenuItem } from "@/lib/items";

type Cart = Record<string, number>;
type CartContextValue = {
  cart: Cart;
  items: MenuItem[];
  itemsLoading: boolean;
  itemsError: string;
  cartCount: number;
  cartTotal: number;
  refreshItems: () => Promise<MenuItem[]>;
  addToCart: (item: MenuItem, amount: number) => boolean;
  setQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  removeCartItems: (ids: string[]) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "verdant-kitchen-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [hydrated, setHydrated] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          const valid: Cart = {};
          for (const [id, quantity] of Object.entries(parsed)) {
            if (id && Number.isSafeInteger(quantity) && Number(quantity) > 0) valid[id] = Number(quantity);
          }
          setCart(valid);
        }
      }
    } catch {
      setCart({});
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const refreshItems = useCallback(async () => {
    setItemsLoading(true);
    setItemsError("");
    try {
      const response = await fetch("/api/items", { cache: "no-store" });
      const payload: unknown = await response.json();
      if (!response.ok) {
        const message = payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
          ? payload.error
          : "The menu could not be loaded.";
        throw new Error(message);
      }
      if (!payload || typeof payload !== "object" || !("items" in payload) || !Array.isArray(payload.items)) {
        throw new Error("The menu service returned an invalid item list.");
      }
      const nextItems = payload.items as MenuItem[];
      setItems(nextItems);
      return nextItems;
    } catch (error) {
      const message = error instanceof Error ? error.message : "The menu could not be loaded.";
      setItemsError(message);
      throw error;
    } finally {
      setItemsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshItems().catch(() => undefined);
  }, [refreshItems]);

  const addToCart = useCallback((item: MenuItem, amount: number) => {
    const nextQuantity = (cart[item.id] ?? 0) + amount;
    if (!Number.isSafeInteger(amount) || amount < 1 || nextQuantity > item.stock) return false;
    setCart((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + amount }));
    return true;
  }, [cart]);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setCart((current) => {
      const item = items.find((candidate) => candidate.id === id);
      const bounded = item ? Math.min(Math.max(0, quantity), item.stock) : Math.max(0, quantity);
      if (bounded === 0) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: bounded };
    });
  }, [items]);

  const removeFromCart = useCallback((id: string) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);

  const removeCartItems = useCallback((ids: string[]) => {
    setCart((current) => {
      const next = { ...current };
      ids.forEach((id) => delete next[id]);
      return next;
    });
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + item.price * (cart[item.id] ?? 0), 0);
    return { cart, items, itemsLoading, itemsError, cartCount, cartTotal, refreshItems, addToCart, setQuantity, removeFromCart, removeCartItems };
  }, [cart, items, itemsLoading, itemsError, refreshItems, addToCart, setQuantity, removeFromCart, removeCartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider.");
  return value;
}
