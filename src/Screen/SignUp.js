import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // 🛎️ Import toast
import 'react-toastify/dist/ReactToastify.css';  // 🛎️ Import CSS

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      toast.error("Invalid email format", {
        position: "top-center",
        autoClose: 2000,
        style: { backgroundColor: "#f44336", color: "#fff" }, // Error toast red color
      });
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 2000,
        style: { backgroundColor: "#f44336", color: "#fff" }, // Error toast red color
      });
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      toast.error("Password must be at least 4 characters long", {
        position: "top-center",
        autoClose: 2000,
        style: { backgroundColor: "#f44336", color: "#fff" }, // Error toast red color
      });
      return;
    }

    setError(""); // Clear any previous error

    try {
      const response = await fetch("https://tasty-heaven-2.onrender.com/api/creatuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          location: address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success toast in green color at the center
        toast.success("Signup Successful! Redirecting to login...", {
          position: "top-center", // Position toast in top-center
          autoClose: 2000, // Duration the toast will be visible
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { backgroundColor: "#4caf50", color: "#fff" }, // Green toast color
          theme: "colored",
        });

        // Delay navigation to allow the toast to be visible
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        if (data.message === "User already exist") {
          setError("This email is already used");
          toast.error("This email is already used", {
            position: "top-center",
            autoClose: 2000,
            style: { backgroundColor: "#f44336", color: "#fff" }, // Error toast red color
          });
        } else {
          setError(data.message || data.error || "Signup failed");
          toast.error(data.message || "Signup failed", {
            position: "top-center",
            autoClose: 2000,
            style: { backgroundColor: "#f44336", color: "#fff" }, // Error toast red color
          });
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Error connecting to the server.");
      toast.error("Error connecting to the server.", {
        position: "top-center",
        autoClose: 2000,
        style: { backgroundColor: "#f44336", color: "#fff" }, // Error toast red color
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #a5d6a7, #81c784)",
        padding: "20px",
      }}
    >
      <div
        className="p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h1
          className="text-center mb-4"
          style={{
            fontFamily: "'Lobster', cursive",
            color: "#ff5722",
            fontSize: "3rem",
            textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
            letterSpacing: "1px",
            marginBottom: "30px",
          }}
        >
          <span style={{ color: "#4caf50" }}>Tasty Heaven</span> 🍔
        </h1>

        <h2 className="text-center mb-4" style={{ color: "#388e3c" }}>
          Signup
        </h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="w-100"
            style={{
              backgroundColor: "#388e3c",
              borderColor: "#388e3c",
              borderRadius: "25px",
              padding: "12px 20px",
              fontWeight: "bold",
            }}
          >
            Signup
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <Link to="/login">
            <Button
              variant="danger"
              className="w-100 mt-3"
              style={{
                borderRadius: "25px",
                padding: "12px 20px",
                fontWeight: "bold",
              }}
            >
              Already a User? Login
            </Button>
          </Link>
        </div>
      </div>

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
};

export default Signup;
