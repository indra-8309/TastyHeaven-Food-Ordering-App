import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import "../Styling/orders.css";
import "../Styling/shimmer.css"; // shimmer + emoji spinner styles
import ShimmerCard from "../components/ShimmerCard"; // reuse shimmer card

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/myOrderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
      }),
    }).then(async (res) => {
      let response = await res.json();
      setOrderData(response);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ height: "50px" }}></div>

      <div className="container">
        {loading ? (
          <>
            {/* 🍕 Emoji Spinner */}
            {/* <div className="emoji-loader text-center my-4">🍔</div> */}

            {/* ✨ Shimmer Cards */}
            <div className="row g-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                  <ShimmerCard />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="row">
            {orderData.orderData &&
              orderData.orderData.order_data
                .slice(0)
                .reverse()
                .map((item, index) => {
                  let orderDate = '';
                  return (
                    <React.Fragment key={index}>
                      {(() => {
                        let totalAmount = 0;
                        return (
                          <>
                            {item.map((arrayData, idx) => {
                              if (arrayData.Order_date) {
                                orderDate = arrayData.Order_date;
                                return (
                                  <div key={`date-${idx}`} className="w-100 mt-5">
                                    <h5 className="text-center order-date">{orderDate}</h5>
                                    <hr />
                                  </div>
                                );
                              } else {
                                totalAmount += arrayData.price;
                                return (
                                  <div
                                    key={idx}
                                    className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center"
                                  >
                                    <div
                                      className="card mt-4 shadow-sm"
                                      style={{
                                        width: '16rem',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                      }}
                                    >
                                      <img
                                        src={arrayData.img}
                                        className="card-img-top"
                                        alt={arrayData.name}
                                        style={{
                                          height: "140px",
                                          objectFit: "contain",
                                          backgroundColor: "#f8f9fa",
                                        }}
                                      />
                                      <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title text-center fw-bold" style={{ fontSize: "1.2rem" }}>
                                          {arrayData.name}
                                        </h5>
                                        <div className="mt-2">
                                          <div className="d-flex justify-content-between">
                                            <small className="text-muted">Qty:</small>
                                            <small className="fw-semibold">{arrayData.qty}</small>
                                          </div>
                                          <div className="d-flex justify-content-between">
                                            <small className="text-muted">Size:</small>
                                            <small className="fw-semibold">{arrayData.size}</small>
                                          </div>
                                          <div className="d-flex justify-content-between mt-2">
                                            <span className="text-success fw-bold">Price:</span>
                                            <span className="fw-bold text-dark">₹{arrayData.price}/-</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}

                            {/* Total */}
                            <div className="w-100 mt-4 d-flex justify-content-center">
                              <div
                                className="border p-3 rounded shadow-sm"
                                style={{ maxWidth: "400px", backgroundColor: "#e9f7ef" }}
                              >
                                <h5 className="text-center mb-0 fw-bold text-success">
                                  Total Amount: ₹{totalAmount}/-
                                </h5>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </React.Fragment>
                  );
                })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
