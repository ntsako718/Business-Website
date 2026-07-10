import CartSummary from "../Components/CartSummary";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import CartItem from "../Components/CartItem";
import Button from "../Components/UI/Button";
import "../Components/CSS/Cart.css"

export default function Cart() {
  const navigate = useNavigate();
  const { state } = useCart();

  if (state.cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your cart is empty</h1>
        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="cart-breadcrumb" onClick={() => navigate("/")}>
          Home <span>&gt;</span> <strong>Cart</strong>
        </div>
        <h1 className="cart-title">Your Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {state.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-summary-col">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}