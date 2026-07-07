import { useCart } from "../Context/CartContext";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <div>
      <div>
        <img src={item.img} alt={item.name} />
      </div>

      <div>
        <i
          className="bx bx-trash"
          onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
        ></i>
      </div>

      <div>
        <h2>{item.name}</h2>
      </div>

      <div>
        <h1>${item.price}</h1>
      </div>

      <div>
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
  );
}