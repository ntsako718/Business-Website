import {Routes, Route} from 'react-router-dom';
import { ProductGrid } from "./Components/ProductGrid";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Homepage from "./Pages/Homepage";
import Cart from './Pages/Cart';
import ProductView from './Pages/ProductView';
import './App.css'


function App() {
  return (
    <div className="app-shell">
      <Header />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<main className='hero-page'><Homepage /></main>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/products" element={<ProductGrid/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;