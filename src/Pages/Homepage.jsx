import { ProductGrid } from "../Components/ProductGrid";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Hero from "../Layout/Hero";

export default function Homepage(){
    return (
      <>
        <Hero/>
        <ProductGrid/>
        <Footer/>
      </>
    );
}