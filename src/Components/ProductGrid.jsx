import { useEffect, useState} from "react";
import ProductCard from "./ProductCard";
import "./CSS/ProductGrid.css";

export function ProductGrid() {
const [loadedProducts, setLoadedProducts] = useState([]);

useEffect(() => {
 async function getProducts(){
    const response = await fetch('http://localhost:3000/products');

    if(!response.ok){
        // throw some error here
    }

    const loadedProducts = await response.json();
    setLoadedProducts(loadedProducts);

    
 }

 getProducts();
}, []);

 return (
  <section className="products-section">
    <ul id="products">
      {loadedProducts.map((product) => (
        <li key={product.id}>
          <ProductCard
          imageUrl={product.imageUrl}
            name={product.name}
            tagline={product.tagline}
            price={product.price}
          />
        </li>
      ))}
    </ul>
  </section>
);
}