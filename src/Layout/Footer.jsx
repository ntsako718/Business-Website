import React, { useState } from "react";
import {ArrowRight, Check } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

import "./Footer.css";

const defaultColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", url: "/features" },
      { label: "Pricing", url: "/pricing" },
      { label: "Changelog", url: "/changelog" },
      { label: "Docs", url: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", url: "/about" },
      { label: "Blog", url: "/blog" },
      { label: "Careers", url: "/careers" },
      { label: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", url: "/help" },
      { label: "Community", url: "/community" },
      { label: "Status", url: "/status" },
      { label: "Terms", url: "/terms" },
    ],
  },
];

const defaultSocials = [
  { label: "GitHub", url: "https://github.com", icon: FaGithub },
  { label: "X", url: "https://x.com", icon: FaXTwitter },
  { label: "LinkedIn", url: "https://linkedin.com", icon: FaLinkedin },
  { label: "Instagram", url: "https://instagram.com", icon: FaInstagram },
];

export default function Footer({
  columns = defaultColumns,
  socials = defaultSocials,
  brand = "Logo",
  tagline = "Building tools that help teams move faster.",
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="sf-footer">
      <div className="sf-footer__inner">
        <div className="sf-footer__top">
          <div className="sf-footer__brand">
            <a href="/" className="sf-footer__logo">{brand}</a>
            <p className="sf-footer__tagline">{tagline}</p>

            <form className="sf-newsletter" onSubmit={handleSubscribe}>
              <label htmlFor="sf-email" className="sf-newsletter__label">
                Get product updates
              </label>
              <div className="sf-newsletter__row">
                <input
                  id="sf-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sf-newsletter__input"
                  required
                />
                <button type="submit" className="sf-newsletter__btn" aria-label="Subscribe">
                  {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
                </button>
              </div>
              {subscribed && (
                <span className="sf-newsletter__success">You're subscribed.</span>
              )}
            </form>
          </div>

          <div className="sf-footer__columns">
            {columns.map((col) => (
              <div key={col.title} className="sf-footer__col">
                <h3 className="sf-footer__col-title">{col.title}</h3>
                <ul className="sf-footer__col-links">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.url} className="sf-footer__link">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="sf-footer__bottom">
          <p className="sf-footer__copyright">
            © {new Date().getFullYear()} {brand}. All rights reserved.
          </p>

          <div className="sf-footer__socials">
            {socials.map(({ label, url, icon: Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="sf-footer__social"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}