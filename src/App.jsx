import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

function App() {
  const [data, setData] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const responseData = await response.json();
      setData(responseData.products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    getProducts();
  });

  const downloadData = () => {
    if (data.length === 0) {
      return [];
    }
    const formattedData = [];
    const selectedFields = [
      "title",
      "description",
      "brand",
      "category",
      "price",
      "stock",
      "rating",
    ];
    formattedData.push(selectedFields);

    data.forEach((item) => {
      const selectedValues = selectedFields.map((field) => item[field]);
      formattedData.push(selectedValues);
    });
    return formattedData;
  };

  return (
    <>
      <div className="container-fluid">
        {data.length > 0 && (
          <CSVLink
            data={downloadData()}
            style={{ fontSize: "12px" }}
            filename={"Products.csv"}
            className="btn btn-sm btn-light mb-2"
            target="_blank"
          >
            <i className="fa fa-download"></i> Download
          </CSVLink>
        )}
        <table
          style={{ fontSize: 10 }}
          className="table bg-white table-condensed table-hover table-striped table-bordered"
        >
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Brand</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((value) => (
                <tr key={value.id}>
                  <td>
                    <img
                      src={value.thumbnail}
                      style={{ width: 50 }}
                      alt={value.title}
                    />
                  </td>
                  <td>{value.title}</td>
                  <td>{value.description}</td>
                  <td>{value.price}</td>
                  <td>{value.rating}</td>
                  <td>{value.stock}</td>
                  <td>{value.brand}</td>
                  <td>{value.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="alert alert-warning">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
