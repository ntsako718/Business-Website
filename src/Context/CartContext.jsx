import { createContext, useContext, useReducer, useEffect } from "react";
import { CartReducer, initialState } from "./CartReducer";


const CartContext = createContext();

function loadCartFromStorage(){
    try{
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : initialState;
    } catch {
        return initialState;
    }
}

export function CartProvider({children}){
    const [state, dispatch] = useReducer(CartReducer, initialState, loadCartFromStorage);
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state));
    }, [state]);

    return (
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext);
}