import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import ProductListing from "./components/productListing";
import AddProduct from "./components/addProduct";
import NavbarComponent from "./components/navbar";
import ProductDetails from "./components/productDetails";
import EditProduct from "./components/editProduct";
import DeleteProduct from "./components/deleteProduct";


function App() {
  

  return (
    <Router>
      <NavbarComponent />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products/:id/delete" element={<DeleteProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;