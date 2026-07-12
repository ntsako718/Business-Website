import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import {
  getCartSubtotal,
  getOrderTotal,
  isEligibleForDelivery,
  buildWhatsAppOrderLink,
} from "../utils/checkout";
import { MIN_ORDER_FOR_DELIVERY, DELIVERY_FEE } from "../Config/checkout";

export default function CartSummary() {
  const { state } = useCart();
  const [fulfillmentMethod, setFulfillmentMethod] = useState("pickup");

  const subtotal = getCartSubtotal(state.cartItems);
  const eligible = isEligibleForDelivery(subtotal);
  const total = getOrderTotal(subtotal, fulfillmentMethod);

  // If the cart drops below the threshold while "delivery" is selected,
  // fall back to pickup automatically rather than leaving an invalid option selected.
  useEffect(() => {
    if (!eligible && fulfillmentMethod === "delivery") {
      setFulfillmentMethod("pickup");
    }
  }, [eligible, fulfillmentMethod]);

  const handleCheckout = () => {
    const link = buildWhatsAppOrderLink(state.cartItems, subtotal, total, fulfillmentMethod);
    window.open(link, "_blank");
  };

  return (
    <div className="cart-summary">
      <ul className="cart-summary__list">
        {state.cartItems.map((item) => (
          <li key={item.id} className="cart-summary__row">
            <span>{item.name} x{item.quantity}</span>
            <span>R{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="cart-summary__row">
        <span>Subtotal</span>
        <span>R{subtotal.toFixed(2)}</span>
      </div>

      <div className="cart-summary__fulfillment">
        <label className="cart-summary__option">
          <input
            type="radio"
            name="fulfillment"
            value="pickup"
            checked={fulfillmentMethod === "pickup"}
            onChange={() => setFulfillmentMethod("pickup")}
          />
          Collection — no fee
        </label>

        <label
          className={`cart-summary__option ${!eligible ? "cart-summary__option--disabled" : ""}`}
        >
          <input
            type="radio"
            name="fulfillment"
            value="delivery"
            checked={fulfillmentMethod === "delivery"}
            disabled={!eligible}
            onChange={() => setFulfillmentMethod("delivery")}
          />
          Delivery — R{DELIVERY_FEE.toFixed(2)}
        </label>
      </div>

      {!eligible && (
        <p className="cart-summary__notice">
          Orders under R{MIN_ORDER_FOR_DELIVERY.toFixed(2)} are collection only — add R
          {(MIN_ORDER_FOR_DELIVERY - subtotal).toFixed(2)} more to unlock delivery.
        </p>
      )}

      {fulfillmentMethod === "delivery" && (
        <div className="cart-summary__row">
          <span>Delivery</span>
          <span>R{DELIVERY_FEE.toFixed(2)}</span>
        </div>
      )}

      <div className="cart-summary__row cart-summary__total">
        <span>Total</span>
        <span>R{total.toFixed(2)}</span>
      </div>

      <button className="cart-summary__checkout" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}