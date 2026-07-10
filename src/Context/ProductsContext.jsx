import { createContext, useContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {

    const [loadedProducts, setLoadedProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const response = await fetch('http://localhost:3000/products');

            if (!response.ok) {
                // throw some error here
            }

            const loadedProducts = await response.json();
            setLoadedProducts(loadedProducts);


        }

        getProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{products: loadedProducts}}>
            {children}
        </ProductsContext.Provider>
    )
}

