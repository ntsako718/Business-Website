import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Home, Mail, ShoppingCart, Package } from "lucide-react";
import "./CSS/Header.css";
import Button from "../Components/UI/Button";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const defaultMenuItems = [
  { id: 1, title: "Home", url: "/", icon: <Home size={20} /> },
  { id: 2, title: "Products", url: "/products", icon: <Package size={20} /> },
  { id: 3, title: "Contact", url: "/contact", icon: <Mail size={20} /> },
  { id: 4, title: "Cart", url: "/cart", icon: <ShoppingCart size={20} />, isCart: true },
];

export default function Header({ menuItems = defaultMenuItems, className = "" }) {
  const navigate = useNavigate();
  const { state } = useCart();
  const cartCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  const openMenu = () => {
    setIsClosing(false);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsClosing(true);
    closeTimeout.current = setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 250);
  };

  const toggleMenu = () => (isMenuOpen ? closeMenu() : openMenu());

  return (
    <>
      <nav className={`sn-navbar ${isScrolled ? "sn-navbar--hidden" : ""} ${className}`}>
        <div className="sn-navbar__inner">
          <div className="sn-navbar__row">
            <Link to="/" className="sn-logo">Logo</Link>

            <div className="sn-desktop-menu">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="sn-nav-item-wrap"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link to={item.url} className="sn-nav-item">
                    <span className="sn-nav-item__icon-wrap">
                      {item.icon}
                      {item.isCart && cartCount > 0 && (
                        <span key={cartCount} className="sn-cart-badge">
                          {cartCount}
                        </span>
                      )}
                    </span>
                    <span>{item.title}</span>
                  </Link>
                  {hoveredItem === item.id && <div className="sn-nav-item-hover" />}
                </div>
              ))}
            </div>

            <Button
              type="button"
              onClick={toggleMenu}
              className="sn-mobile-btn"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <div className={`sn-fab-wrap ${isScrolled ? "sn-fab-wrap--visible" : ""}`}>
        <Button
          type="button"
          onClick={toggleMenu}
          className={`sn-fab ${isScrolled ? "sn-fab--scrolled" : ""}`}
          aria-label="Open menu"
        >
          <Menu size={24} />
          {cartCount > 0 && (
            <span key={cartCount} className="sn-cart-badge sn-cart-badge--fab">
              {cartCount}
            </span>
          )}
        </Button>
      </div>

      {isMenuOpen && (
        <>
          <div
            className={`sn-backdrop ${isClosing ? "sn-backdrop--closing" : ""}`}
            onClick={closeMenu}
          />

          <div className={`sn-menu ${isClosing ? "sn-menu--closing" : ""}`}>
            <div className="sn-menu__panel">
              <Button
                type="button"
                onClick={closeMenu}
                className="sn-menu__close"
                aria-label="Close menu"
              >
                <X size={20} />
              </Button>

              <div className="sn-menu__items">
                {menuItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="sn-menu-item"
                    style={{ animationDelay: `${index * 0.06}s` }}
                  >
                    <Link to={item.url} onClick={closeMenu} className="sn-menu-item__link">
                      <span className="sn-menu-item__icon">
                        {item.icon}
                        {item.isCart && cartCount > 0 && (
                          <span key={cartCount} className="sn-cart-badge">
                            {cartCount}
                          </span>
                        )}
                      </span>
                      <span className="sn-menu-item__label">{item.title}</span>
                    </Link>
                  </div>
                ))}
              </div>

              <span className="sn-menu__dot sn-menu__dot--top" />
              <span className="sn-menu__dot sn-menu__dot--bottom" />
            </div>
          </div>
        </>
      )}
    </>
  );
}