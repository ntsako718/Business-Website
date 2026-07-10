import {Routes, Route} from 'react-router-dom';
import { ProductGrid } from "./Components/ProductGrid";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Homepage from "./Pages/Homepage";
import Cart from './Pages/Cart';
import ProductView from './Pages/ProductView';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<main><Homepage/></main>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/product/:id"
         element = {<ProductView/>}
         />
      </Routes>
      
    </>
  );
}

export default App;
