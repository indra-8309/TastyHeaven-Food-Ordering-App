import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import Cart from '../Screen/Cart';
import { useCart } from './ContextReducer';
import { Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // 🛎️ Import toast
import 'react-toastify/dist/ReactToastify.css';           // 🛎️ Import CSS
import '../Styling/Navbar.css';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || '');
  let data = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userEmail = localStorage.getItem("userEmail") || "";
  const userRole = isAdmin ? "Admin" : "Customer";

  useEffect(() => {
    async function fetchUserDetails() {
      if (!userName && userEmail) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getUserDetails`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authToken': localStorage.getItem('authToken')
            },
            body: JSON.stringify({ email: userEmail })
          });
          const json = await response.json();
          if (json.success) {
            setUserName(json.name);
            localStorage.setItem("userName", json.name);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    }
    fetchUserDetails();
  }, [userEmail, userName]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully! 👋", {
      position: "top-center",
      autoClose: 2000, // wait for 2 sec before navigation
      onClose: () => navigate("/login")})// 🛎️ Show toast
    
  };

  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className='cas'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">TastyHeaven</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className={`nav-link fw-bold ${getActiveClass('/')}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link fw-bold ${getActiveClass('/products')}`} aria-current="page" to="/products">
                  Products
                </Link>
              </li>

              {
                (!isAdmin && localStorage.getItem("authToken")) && (
                  <li className="nav-item">
                    <Link className={`nav-link fw-bold ${getActiveClass('/myOrder')}`} aria-current="page" to="/myOrder">
                      My Orders
                    </Link>
                  </li>
                )
              }

              {
                (isAdmin && localStorage.getItem("authToken")) && (
                  <li className="nav-item">
                    <Link className={`nav-link fw-bold ${getActiveClass('/addproduct')}`} aria-current="page" to="/addproduct">
                      Add Product
                    </Link>
                  </li>
                )
              }
            </ul>

            <div className="d-flex align-items-center">
              {/* Profile */}
              {
                localStorage.getItem("authToken") && (
                  <Dropdown align="end" className="me-3">
                    <Dropdown.Toggle variant="light" className="fw-bold text-success d-flex align-items-center profile-toggle">
                      <FaUserCircle size={24} className="me-2" /> Hi, {userName?.split(' ')[0]} 👋
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.ItemText>
                        <strong>Name:</strong> {userName}
                      </Dropdown.ItemText>
                      <Dropdown.ItemText>
                        <strong>Email:</strong> {userEmail}
                      </Dropdown.ItemText>
                      <Dropdown.ItemText>
                        <strong>Role:</strong> {userRole}
                      </Dropdown.ItemText>
                    </Dropdown.Menu>
                  </Dropdown>
                )
              }

              {/* Cart */}
              {
                (!isAdmin && localStorage.getItem("authToken")) && (
                  <div className="btn bg-white text-success mx-1 fw-bold fst-italic" onClick={() => setCartView(true)}>
                    My Cart {" "}
                    <Badge pill bg="danger">{data.length}</Badge>
                  </div>
                )
              }
              {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}

              {/* Logout */}
              {
                localStorage.getItem("authToken") && (
                  <div className="btn bg-white text-danger mx-1 fw-bold fst-italic" onClick={handleLogout}>
                    Logout
                  </div>
                )
              }

              {/* If not logged in */}
              {
                (!localStorage.getItem("authToken")) && (
                  <div className="d-flex">
                    <Link className="btn bg-white text-success mx-1 fw-bold fst-italic" to="/login">Login</Link>
                    {!isAdmin && (
                      <Link className="btn bg-white text-success mx-1 fw-bold fst-italic" to="/creatuser">SignUp</Link>
                    )}
                  </div>
                )
              }
            </div>

          </div>
        </div>
      </nav>

      {/* 🛎️ Toastify container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
