import { useCart } from "../Context/CartContext";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={`http://localhost:3000${item.imageUrl}`} alt={item.name} />
      </div>

      <div className="cart-item__body">
        <div className="cart-item__top">
          <h2 className="cart-item__name">{item.name}</h2>
          <span
            className="cart-item__remove"
            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
            role="button"
            aria-label="Remove item"
          >
            ×
          </span>
        </div>

        <h1 className="cart-item__price">R{item.price.toFixed(2)}</h1>

        <div className="cart-item__meta">
          {item.color && <span className="cart-item__tag">{item.color}</span>}
          {item.size && <span className="cart-item__tag">{item.size}</span>}
        </div>

        <div className="cart-item__quantity">
          <span className="cart-item__quantity-label">Quantity</span>
          <div className="cart-item__stepper">
            <button
              onClick={() => dispatch({ type: "DECREMENT", payload: item.id })}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => dispatch({ type: "INCREMENT", payload: item.id })}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}