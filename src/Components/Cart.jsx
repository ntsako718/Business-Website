import CartSummary from "./CartSummary";
import {useNavigate} from "react-router-dom"
import { useCart } from "../Context/CartContext";
import CartItem from "./CartItem";
import Button from "./UI/Button";

export default function Cart(){
    const navigate = useNavigate();
    const {state} = useCart();

    if(CartItems.length === 0){
        return (
            <div>
                <h1> Your Cart is Empty</h1>
                <Button onClick = {() => navigate("/")}>Go to Home</Button>
            </div>
        )
    }

    return (
        <div>
            <div>
                <div>
                    <h1 onClick ={() => navigate("/")}> Home &gt;</h1>
                    <h2>Cart</h2>
                </div>

                <h1> Your Cart</h1>
            </div>

            <div>
                <div>
                    {CartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <div>
                    <CartSummary/>
                </div>
            </div>
        </div>
    )
}