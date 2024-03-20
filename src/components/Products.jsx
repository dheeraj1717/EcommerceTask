import React, { useEffect, useState } from "react";
import ProductCard from '../components/ProductCard.jsx'
 
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("https://dummyjson.com/products");
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setProducts(data.products);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {products.map((item) => (
        <h3 key={item.id}><ProductCard data ={item}/></h3>
      ))}
    </div>
  );
};

export default Products;
