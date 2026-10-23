"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart-provider";

function Icon({ children, className = "" }: { children: string; className?: string }) {
  return <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>{children}</span>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const isCart = pathname === "/cart";
  const { cartCount } = useCart();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Verdant Kitchen home">
          <img className="brand-mark" src="https://lh3.googleusercontent.com/aida/AEtjO1UmnJ9AfEVYpkXOpQqmNJH_hEI519IagmKX3nQQaPXuvmnA70m6W2ZRSwOumbfiuFZgu85EHvc-N4pxyW35rajDIo5q9bjnECU6ADmxMFsu09uTd4gRMknq9XT1CH8UppDvOy6m-ta4GXhQOqRe57Z-yuqYPY7zybxW_c0tswP_YRiXkIMkMN6w6tyWxSf-Du4dGzHvBfstSfxwgN0bL-QSyzxQkhMFrZVlPvSTc8ienmCuQh5J3iI4zLQ" alt="" />
          <span className="brand-copy"><strong>Verdant Kitchen</strong><small>Artisanal Kitchen &amp; Grill</small></span>
        </Link>
        <div className="header-actions">
          <nav className="main-nav" aria-label="Main navigation">
            <Link className={!isCart ? "active" : ""} href="/">Menu</Link>
            <Link className={isCart ? "active" : ""} href="/cart">Cart</Link>
          </nav>
          <Link className="header-cart" href="/cart" aria-label={`View cart, ${cartCount} items`}>
            <Icon>shopping_bag</Icon><span className="cart-badge">{cartCount}</span>
          </Link>
          <span className="profile-icon"><Icon>person</Icon></span>
        </div>
      </div>
    </header>
  );
}
