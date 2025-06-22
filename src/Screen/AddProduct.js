import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    img: "",
    category: "",
  });
  const [options, setOptions] = useState([{ size: "", price: "" }]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      toast.error("You must be logged in to add a product.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [navigate]);

  const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { size: "", price: "" }]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const optionsObject = options.reduce((acc, curr) => {
        if (curr.size && curr.price) {
          acc[curr.size] = curr.price;
        }
        return acc;
      }, {});

      const response = await fetch("https://tasty-heaven-2.onrender.com/api/admin/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          CategoryName: productData.category,
          name: productData.name,
          img: productData.img,
          description: productData.description,
          options: [optionsObject],
        }),
      });

      const json = await response.json();
      if (json.success) {
        toast.success("Product added successfully!", {
          position: "top-center",
          autoClose:1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#388e3c",
            color: "#fff",
          },
        });

        setProductData({ name: "", description: "", img: "", category: "" });
        setOptions([{ size: "", price: "" }]);

        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } catch (err) {
      toast.error("Error connecting to the server.");
    }
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
    <div>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(to right, #a5d6a7, #81c784)",
          minHeight: "calc(100vh - 80px)",
          paddingTop: "80px",
        }}
      >
        <div
          className="p-4"
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h2 className="text-center mb-3" style={{ color: "#388e3c" }}>
            Add New Product
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={productData.name}
                onChange={handleProductChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                name="description"
                value={productData.description}
                onChange={handleProductChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="img"
                value={productData.img}
                onChange={handleProductChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                name="category"
                value={productData.category}
                onChange={handleProductChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                required
              />
            </Form.Group>

            <h5 className="mt-4" style={{ color: "#388e3c" }}>Options</h5>

            {options.map((option, index) => (
              <div key={index} className="d-flex gap-2 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Size (e.g. Small)"
                  value={option.size}
                  onChange={(e) => handleOptionChange(index, "size", e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  required
                />
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={option.price}
                  onChange={(e) => handleOptionChange(index, "price", e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  required
                />
                {index > 0 && (
                  <Button
                    variant="danger"
                    onClick={() => removeOption(index)}
                    style={{ borderRadius: "50%", padding: "6px 10px" }}
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}

            <Button
              variant="info"
              onClick={addOption}
              className="w-100 mb-4"
              style={{
                backgroundColor: "#0288d1",
                borderColor: "#0288d1",
                borderRadius: "25px",
                padding: "10px",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#01579b")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#0288d1")}
            >
              + Add Option
            </Button>

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
              Add Product
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
