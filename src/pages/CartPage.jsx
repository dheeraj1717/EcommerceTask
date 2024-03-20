import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/CartSlice";
import { NavLink } from "react-router-dom";


function CartPage({ onClose }) {
  const { cart } = useSelector((state) => state.allcart);
  const dispatch = useDispatch();
  const [itemQuantities, setItemQuantities] = useState(
    cart.reduce((quantities, item) => {
      quantities[item.id] = item.quantity;
      return quantities;
    }, {})
  );

  // Function to handle quantity change for an item
  const handleQuantityChange = (itemId, newQuantity) => {
    // Update the itemQuantities state
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const handleQuantityInput = (itemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      handleQuantityChange(itemId, newQuantity);
    }
  };

  const itemSubtotals = useMemo(() => {
    return cart.reduce((subtotals, item) => {
      const quantity = itemQuantities[item.id];
      subtotals[item.id] = item.price * quantity;
      return subtotals;
    }, {});
  }, [cart, itemQuantities]);

  const total = useMemo(() => {
    if (cart.length === 0) return 0;
    return Object.values(itemSubtotals).reduce((sum, subtotal) => sum + subtotal, 0);
  }, [cart, itemSubtotals]);

  return (
    <>
    
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                      Your Cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={onClose}>
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart.map((item) => (
                          <li className="flex py-6" key={item.id}>
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 p-1">
                              <img
                                src={item.img}
                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">{item.title}</a>
                                  </h3>
                                </div>
                                <p className="">{item.price}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    className="px-3 py-1 bg-gray-300 border border-gray-400 rounded-l"
                                    onClick={() => handleQuantityChange(item.id, itemQuantities[item.id] - 1)}
                                    disabled={itemQuantities[item.id] <= 1}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    className="w-10 px-2 py-1 border-t border-b border-gray-400 text-center"
                                    value={itemQuantities[item.id]}
                                    onChange={(e) => handleQuantityInput(item.id, e)}
                                  />
                                  <button
                                    className="px-3 py-1 bg-gray-300 border border-gray-400 rounded-r"
                                    onClick={() => handleQuantityChange(item.id, itemQuantities[item.id] + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                  <NavLink to="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">  Checkout</NavLink>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={onClose}>
                        Continue Shopping <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
}

export default CartPage;
