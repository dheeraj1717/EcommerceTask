import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/CartSlice';
import { NavLink, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function SingleProduct() {
  const items = useSelector((state) => state.allcart.items);
  const dispatch = useDispatch();

  const handleCartClick = (event, item) => {
    event.preventDefault();
    dispatch(addToCart(item));
  };

  return (
    <div className="m-2">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <Link key={item.id} to={`/product-details/${item.id}`}>
              <div className="p-4 border shadow-md rounded-md bg-white">
                <div className="rounded-md m-2 flex items-center justify-center bg-white overflow-hidden">
                  <img src={item.img} alt="..." className="w-36 h-36 object-cover" />
                </div>
                <div className="px-2">
                  <div className="font-bold text-xl mb-2 mt-2">{item.title}</div>
                  <p className="mb-4 text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, consectetur.
                  </p>
                  <div className="flex justify-between">
                    <div className="text-center font-bold text-[1.22rem]  px-2 py-1 rounded-sm">Rs.{item.price}</div>
                    <button className="py-1 rounded-sm" onClick={(event) => handleCartClick(event, item)}>
                      <FaShoppingCart className="w-8 h-7 bg-[#092a94] text-white p-2 rounded-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
