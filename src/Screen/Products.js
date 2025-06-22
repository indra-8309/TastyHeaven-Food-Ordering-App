import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import '../Styling/product.css';

export default function Products() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/food_datas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getFilteredItems = () => {
    return foodCat.map((data) => {
      return foodItem.filter(
        (item) =>
          item.CategoryName === data.CategoryName &&
          item.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const filteredItems = getFilteredItems();
  const hasNoResults = filteredItems.every((categoryItems) => categoryItems.length === 0) && search.length > 0;

  return (
    <div>
      <Navbar />
      <div style={{ height: "120px" }}></div>

      <div className="container mb-4">
        <div className="d-flex justify-content-center">
          <input
            className="form-control w-50"
            type="search"
            placeholder="Search Food Item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              border: "2px solid #4caf50",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              fontSize: "1rem",
            }}
          />
        </div>
      </div>

      <div className="container">
        {hasNoResults && (
          <div className="no-match-found d-flex justify-content-center align-items-center text-center text-danger fs-4">
            No Match Found
          </div>
        )}

        {foodCat.map((data) => {
          const filteredItemsInCategory = filteredItems.find(
            (item) => item.length > 0 && item[0].CategoryName === data.CategoryName
          );

          return (
            <div className="row mb-5" key={data._id}>
              {filteredItemsInCategory && (
                <>
                  <div className="fs-3 m-3 category-name">
                    {data.CategoryName}
                  </div>
                  <hr />
                  <div className="row g-4">
                    {filteredItemsInCategory.map((filterItems, index) => {
                      const bgColor = index % 2 === 0 ? "#f5f5f5" : "#dcdcdc"; // light gray and darker gray
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 mb-4">
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                            bgColor={bgColor}
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
