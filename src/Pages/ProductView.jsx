import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "../Components/CSS/ProductView.css";
import { ProductsContext } from "../Context/ProductsContext"

export default function ProductView() {

    const { id } = useParams();
    const { products } = useContext(ProductsContext);

    console.log(products);

    const product = products.find(
        p => p.id === id
    );

    if (!product) {
        return <h2>Loading product...</h2>;
    }

    console.log(product);

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
            <div className="product-view__image">
                <img src={`http://localhost:3000${product.imageUrl}`} alt={product.name} />
            </div>

            <div className="product-view__details">
                <span className="product-view__brand">{product.brand}</span>
                <h1 className="product-view__name">{product.name}</h1>
                <p className="product-view__description">{product.description}</p>

                <div className="product-view__price">${product.price.toFixed(2)}</div>

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
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}