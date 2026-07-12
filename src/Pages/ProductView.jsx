import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "../Components/CSS/ProductView.css";
import { ProductsContext } from "../Context/ProductsContext";

export default function ProductView() {
  const { id } = useParams();
  const { products } = useContext(ProductsContext);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h2 className="product-view__loading">Loading product...</h2>;
  }

  const { dispatch } = useCart();
  const [qty, setQty] = useState(1);

  const decrement = () => setQty((q) => Math.max(1, q - 1));
  const increment = () => setQty((q) => Math.min(10, q + 1));

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: qty } });
    setQty(1);
  };

  return (
    <div className="product-view">
      <nav className="product-view__breadcrumb">
        <a href="/">Home</a>
        <i className="bx bx-chevron-right"></i>
        {product.category && (
          <>
            <a href="/">{product.category}</a>
            <i className="bx bx-chevron-right"></i>
          </>
        )}
        <span>{product.name}</span>
      </nav>

      <div className="product-view__layout">
        <div className="product-view__image-wrap">
          <div className="product-view__image">
            <img
              src={`http://localhost:3000${product.imageUrl}`}
              alt={product.name}
            />
          </div>
          {product.badge && (
            <span className="product-view__badge">
              <i className="bx bxs-star"></i>
              {product.badge}
            </span>
          )}
        </div>

        <div className="product-view__details">
          <div className="product-view__eyebrow">
            <span className="product-view__brand">{product.brand}</span>
            {product.rating && (
              <>
                <span className="product-view__dot" />
                <span className="product-view__rating">
                  <i className="bx bxs-star"></i>
                  {product.rating}
                  {product.reviewCount && (
                    <span className="product-view__reviews">
                      ({product.reviewCount} reviews)
                    </span>
                  )}
                </span>
              </>
            )}
          </div>

          <h1 className="product-view__name">{product.name}</h1>
          <p className="product-view__description">{product.description}</p>

          <div className="product-view__price-row">
            <span className="product-view__price">
              R{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="product-view__price-original">
                R{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="product-view__controls">
            <div className="product-view__stepper">
              <button onClick={decrement} aria-label="Decrease quantity">
                −
              </button>
              <span>{qty}</span>
              <button onClick={increment} aria-label="Increase quantity">
                +
              </button>
            </div>

            <button className="product-view__add" onClick={handleAddToCart}>
              <i className="bx bx-cart-add"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}