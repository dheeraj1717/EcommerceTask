import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
  return (
    <div>
      <Link to={`/product-details/${data.title}`}>
        <img src={data.thumbnail} alt="" />
      </Link>
    </div>
  );
};

export default ProductCard;
