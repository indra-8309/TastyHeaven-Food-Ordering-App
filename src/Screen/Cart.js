import { useCart, useDispatchCart } from '../components/ContextReducer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart({ hideCart }) {  // Accept hideCart function as a prop
  let data = useCart();
  let dispatch = useDispatchCart();

  // If the cart is empty
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center text-white fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  // Handle checkout process
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
      let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/orderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.status === 200) {
        // Delay dispatch until after the toast is triggered
        toast.success("Order placed successfully! 🎉", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          zIndex: 9999, // Ensure the toast appears above all content
        });

        // Dispatch after the success toast is shown
        setTimeout(() => {
          dispatch({ type: "DROP" });
        }, 2000); // Make sure to dispatch after 2 seconds delay
      } else {
        toast.error("Failed to place order 😞", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          zIndex: 9999, // Ensure the toast appears above all content
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later. 😞", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        zIndex: 9999, // Ensure the toast appears above all content
      });
    }
  };

  // Calculate the total price
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='anyClass' style={{ zIndex: "9998" }}>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md sc'>
        <table className='table'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Image</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>

          <tbody className="text-black">
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>
                  <img src={food.img} alt={food.name} width="50" height="50" style={{ objectFit: "cover", borderRadius: "8px" }} />
                </td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0 text-black" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h1 className='fs-2 text-black'>Total Price: {totalPrice}/-</h1>
        </div>

        <div>
          <button className='btn bg-success mt-5 temp text-white' onClick={handleCheckOut}>Check Out</button>
          {/* Close button to hide the cart */}
          {/* <button className="btn btn-danger mt-3" onClick={hideCart}>Close Cart</button> */}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
