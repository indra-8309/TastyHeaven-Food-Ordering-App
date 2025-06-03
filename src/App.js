import "./App.css";
import Home from "./Screen/Home";
import Login from "./Screen/Login";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./Screen/SignUp";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./Screen/MyOrder";
import Products from "./Screen/Products.js";
import AddProduct from "./Screen/AddProduct.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <CartProvider>
        <ToastContainer
    />
      <Router>
        <div>
          <Routes>
          
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/creatuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/addproduct" element={<AddProduct />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
