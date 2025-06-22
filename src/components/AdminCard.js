import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AdminCard({ foodItem, fetchProducts }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img: "",
    CategoryName: "",
    options: {},
  });

  const handleEditClick = () => {
    setFormData({
      name: foodItem.name,
      description: foodItem.description,
      img: foodItem.img,
      CategoryName: foodItem.CategoryName,
      options: foodItem.options[0],
    });
    setShowModal(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/deleteproduct/${foodItem._id}`, {
        method: "DELETE",
      });

      const json = await response.json();
      if (json.success) {
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh products list
      } else {
        alert("Failed to delete product.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/updateproduct/${foodItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        img: formData.img,
        CategoryName: formData.CategoryName,
        options: [formData.options],
      }),
    });

    const json = await response.json();
    if (json.success) {
      alert("Product updated successfully!");
      setShowModal(false);
      fetchProducts();
    } else {
      alert("Failed to update product.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "half" || name === "full") {
      setFormData({
        ...formData,
        options: {
          ...formData.options,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "160px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <p className="card-text text-muted" style={{ fontSize: "14px" }}>{foodItem.description}</p>

          <div className="d-flex justify-content-between mt-2">
            <Button variant="primary" size="sm" onClick={handleEditClick}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteClick}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={formData.img}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="CategoryName"
                value={formData.CategoryName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Half and Full Prices */}
            <Form.Group className="mb-3">
              <Form.Label>Half Price</Form.Label>
              <Form.Control
                type="number"
                name="half"
                value={formData.options.half || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Full Price</Form.Label>
              <Form.Control
                type="number"
                name="full"
                value={formData.options.full || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Update Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
