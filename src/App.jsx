import { ProductList } from "./Components/ProductList";
import Footer from "./Layout/Footer";
import ScrollNavbar from "./Layout/ScrollNavbar";

function App() {
  return (
    <>
      <ScrollNavbar/>
      <main>
        <ProductList/>
        <Footer/>
      </main>
      
    </>
  );
}

export default App;
