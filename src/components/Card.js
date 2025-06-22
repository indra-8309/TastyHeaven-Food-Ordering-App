import  { useRef, useEffect, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const priceRef = useRef();
  const data = useCart();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [editName, setEditName] = useState(props.foodItem.name);
  const [editImg, setEditImg] = useState(props.foodItem.img);
  const [editOptions, setEditOptions] = useState(options);
  const [editDescription, setEditDescription] = useState(props.foodItem.description);

  useEffect(() => {
    if (priceRef.current) setSize(priceRef.current.value);
  }, []);

  const increaseQty = () => setQty((prevQty) => prevQty + 1);
  const decreaseQty = () => setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id && item.size === size) {
        food = item;
        break;
      }
    }

    const finalPrice = qty * parseInt(options[size]);

    if (food && food.size === size) {
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        size: size,
        price: finalPrice,
        qty: qty,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodItem.img,
      });
    }

    toast.success("Added to cart 🛒", {
      position: "top-center",
      autoClose: 1500,
      theme: "colored",
    });
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = {
        name: editName,
        img: editImg,
        options: editOptions,
        description: editDescription,
      };

      await axios.put(`http://localhost:5000/api/foodItem/update/${props.foodItem._id}`, updatedProduct);

      toast.success("Product updated successfully ✅", {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product ❌", {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleDeleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/foodItem/delete/${props.foodItem._id}`);

        toast.success("Product deleted successfully 🗑️", {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1600);
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete product ❌", {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "fit-content", backgroundColor: "#f0f0f0" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "160px", objectFit: "fill" }}
        />
        <div className="card-body">
          {editMode ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="form-control mb-2"
                placeholder="Name"
              />
              <input
                type="text"
                value={editImg}
                onChange={(e) => setEditImg(e.target.value)}
                className="form-control mb-2"
                placeholder="Image URL"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="form-control mb-2"
                placeholder="Description"
              />
              <div className="d-flex flex-column mb-2">
                {Object.entries(editOptions).map(([key, val], index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newOptions = { ...editOptions };
                        const newKey = e.target.value;
                        const oldValue = newOptions[key];
                        delete newOptions[key];
                        newOptions[newKey] = oldValue;
                        setEditOptions(newOptions);
                      }}
                      className="form-control form-control-sm mb-1"
                      style={{ width: "70%" }}
                      placeholder="Option"
                    />
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => {
                        setEditOptions({
                          ...editOptions,
                          [key]: e.target.value,
                        });
                      }}
                      className="form-control form-control-sm"
                      style={{ width: "25%" }}
                      placeholder="Price"
                    />
                  </div>
                ))}
              </div>
              <button className="btn btn-success btn-sm me-2" onClick={handleUpdateProduct}>
                Update
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h5 className="card-title">{props.foodItem.name}</h5>
              <p className="text-muted" style={{ fontSize: "14px" }}>
                {props.foodItem.description}
              </p>
              <div className="d-flex flex-column mb-2">
                {Object.entries(options).map(([key, val], index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="fw-bold">{key}</div>
                    <div className="fw-bold">₹{val}</div>
                  </div>
                ))}
              </div>

              {isAdmin ? (
                <>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => setEditMode(true)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={handleDeleteProduct}>
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <div className="container w-100 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-success btn-sm" onClick={decreaseQty}>
                        -
                      </button>
                      <span className="mx-2 fs-5 text-dark fw-bold">{qty}</span>
                      <button className="btn btn-outline-success btn-sm" onClick={increaseQty}>
                        +
                      </button>
                    </div>

                    <select
                      className="m-2 h-100 bg-success rounded text-white"
                      ref={priceRef}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      {priceOptions.map((data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      ))}
                    </select>

                    <div className="fs-5 fw-bold text-muted">₹{qty * parseInt(options[size])}/-</div>
                  </div>
                  <hr />
                  <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
