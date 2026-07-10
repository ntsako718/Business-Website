import { useCart } from "../Context/CartContext";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={item.img} alt={item.name} />
      </div>

      <div className="cart-item__body">
        <div className="cart-item__top">
          <h2 className="cart-item__name">{item.name}</h2>
          <i
            className="bx bx-x cart-item__remove"
            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
          ></i>
        </div>

        <h1 className="cart-item__price">${item.price}</h1>

        <div className="cart-item__meta">
          {item.color && <span className="cart-item__tag">{item.color}</span>}
          {item.size && <span className="cart-item__tag">{item.size}</span>}
        </div>

        <div className="cart-item__quantity">
          <span className="cart-item__quantity-label">Quantity</span>
          <div className="cart-item__stepper">
            <i
              className="bx bx-minus"
              onClick={() => dispatch({ type: "DECREMENT", payload: item.id })}
            ></i>
            <span>{item.quantity}</span>
            <i
              className="bx bx-plus"
              onClick={() => dispatch({ type: "INCREMENT", payload: item.id })}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}