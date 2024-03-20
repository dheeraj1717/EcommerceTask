import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/CartSlice";
import CartPage from "../pages/CartPage"; // Import the CartPage component here

const Navbar = () => {
  const cartItems = useSelector((state) => state.allcart.cart);
  const dispatch = useDispatch();
  const [isCartOpen, setCartOpen] = React.useState(false);

  const handleCartToggle = () => {
    setCartOpen((prevState) => !prevState);
  };

  // Calculate the number of unique items in the cart
  const uniqueItemsCount = cartItems.reduce((count, item) => {
    return count + (item.quantity > 0 ? 1 : 0);
  }, 0);

  return (
    <>
      <div className="shadow-lg backdrop-blur-lg py-5 text-white bg-black relative">
        <nav className="flex px-[5%] items-center container mx-auto justify-between">
          <div>
            <Link to="/">
              <img src="" alt="logo" />
            </Link>
          </div>
          <div>
            <ul className="list-none flex justify-center items-center ml-auto gap-5 font-semibold capitalize"></ul>
          </div>

          <div className="flex gap-4">
            <div className="relative flex ">
              <button className="mr-4" onClick={handleCartToggle}>
                <FaShoppingCart />
                {uniqueItemsCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-3 px-2 py-1 bg-red-600 text-white rounded-full text-xs">
                    {uniqueItemsCount}
                  </span>
                )}
              </button>
            </div>
            <button className="bg-white text-black font-semibold p-1 rounded-lg">
              Add Product
            </button>
          </div>
        </nav>
      </div>

      {/* CartPage component */}
      {isCartOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <CartPage onClose={handleCartToggle} />
        </div>
      )}
      {/* End of CartPage component */}
    </>
  );
};

export default Navbar;
