import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const endpoint = isAdmin
        ? "https://tasty-heaven-2.onrender.com/api/loginadmin"
        : "https://tasty-heaven-2.onrender.com/api/loginuser";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (!json.success) {
        setError("Invalid credentials. Please try again.");
      } else {
        const { name, email, role } = json.userData;
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("isAdmin", isAdmin);

        toast.success(`${isAdmin ? "Admin" : "User"} Login Successful 🎉`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/");
        }, 1800); // small wait for toast to show
      }
    } catch (err) {
      setError("Error connecting to the server.");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const inputStyle = {
    borderRadius: "8px",
    padding: "10px",
    border: "2px solid #ccc",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const inputFocusStyle = {
    borderColor: "#1b5e20",
    boxShadow: "0 0 5px rgba(27, 94, 32, 0.5)",
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #a5d6a7, #81c784)",
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
          }}
        >
          <span style={{ color: "#4caf50" }}>Tasty Heaven</span> 🍔
        </h1>

        <h2 className="text-center mb-3" style={{ color: "#388e3c" }}>
          {isAdmin ? "Admin Login" : "Customer Login"}
        </h2>

        {error && <Alert variant="danger">{error}</Alert>}

        {/* Toggle Admin/User */}
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Login as Admin"
          checked={isAdmin}
          onChange={() => setIsAdmin(!isAdmin)}
          className="mb-3"
        />

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
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
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2c6e1f")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#388e3c")}
          >
            Login
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <Link to="/creatuser">
            <Button
              variant="danger"
              className="w-100 mt-3"
              style={{
                backgroundColor: "#d32f2f",
                borderColor: "#d32f2f",
                borderRadius: "25px",
                padding: "12px 20px",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#9a0007")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#d32f2f")}
            >
              I am a new user
            </Button>
          </Link>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
