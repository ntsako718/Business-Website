import React from "react";
import "./ProductCard.css";
import Button from "./UI/Button";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductCard({
  className = "",
  imageUrl,
  name,
  tagline,
  price,
  currency = "R",
  ...props
}) {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("R", currency);
  };

  return (
    <div className={`pc-card ${className}`} {...props}>
      {/* Product Image */}
      <div className="pc-card__image-wrap">
        <img src={`${API_URL}${imageUrl}`} alt={name} className="pc-card__image" />
      </div>

      {/* Product Details */}
      <div className="pc-card__details">
        <h3 className="pc-card__name">{name}</h3>
        <p className="pc-card__tagline">{tagline}</p>
      </div>

      {/* Price */}
      <div className="pc-card__pricing">
        <span className="pc-card__price">{formatPrice(price)}</span>
      </div>

      {/* View Button */}
       <Button className="pc-card__cta">
         View
       </Button>


    </div>
  );
}