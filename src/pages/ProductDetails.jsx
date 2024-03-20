import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addToCart } from "../redux/slices/CartSlice";

function ProductDetails() {
  const { title } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        let response = await fetch(
          `https://dummyjson.com/products?title=${title}`
        );
        if (response.ok) {
          let data = await response.json();
          setSelectedItem(data.products[0]);
        } else {
          console.error(
            "Failed to fetch product details:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [title]); // Fetch product details whenever title parameter changes

  const handleAddToCart = () => {
    dispatch(addToCart({ ...selectedItem, quantity }));
  };

  if (!selectedItem) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen px-20">
        <div className="flex items-center">{selectedItem.title}</div>
      </div>
    </>
  );
}

export default ProductDetails;
