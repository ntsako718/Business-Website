import {Routes, Route} from 'react-router-dom';
import { ProductGrid } from "./Components/ProductGrid";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Homepage from "./Pages/Homepage";
import Cart from './Components/Cart';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<main><Homepage/></main>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      
    </>
  );
}

export default App;
