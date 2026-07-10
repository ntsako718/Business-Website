import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { state } = useCart();
  const navigate = useNavigate();

  const total = state.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-summary">
      <ul className="cart-summary__list">
        {state.cartItems.map((item) => (
          <li key={item.id} className="cart-summary__row">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>

      <div className="cart-summary__row cart-summary__tax">
        <span>Sales tax</span>
        <span>Included</span>
      </div>

      <div className="cart-summary__row cart-summary__total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        className="cart-summary__checkout"
        onClick={() => navigate("/checkout")}
      >
        Proceed to checkout
      </button>
    </div>
  );
}