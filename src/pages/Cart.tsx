// @ts-nocheck
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAppSelector, useAppDispatch } from '../app/hooks'; // Custom hooks to access the Redux store
import { CartItem, removeItem, addItem } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import getApiUrl from '../../urlsPath';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      const item = cartItems.find(item => item.id === id);
      if (item) {
        dispatch(addItem({ ...item, quantity: newQuantity - item.quantity })); // Adjust quantity based on new input
      }
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const imageUrl = getApiUrl();

  const handleNavigate = () => {
    navigate('/checkout');
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <section className='flex-grow mt-4 p-4 container mx-auto bg-white shadow-md rounded-md'>
        <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className='text-center'>Your cart is empty.</p>
        ) : (
          <div className='space-y-6'>
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className='flex flex-col md:flex-row justify-between items-center border-b pb-4'>
                {/* Item Details with Image */}
                <div className='flex items-center space-x-4'>
                  <img
                    src={`${imageUrl}${item.image}`}
                    alt={item.name}
                    className='w-20 h-20 object-cover rounded-md'
                  />
                  <div>
                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                    <p className='text-sm text-gray-600'>Price: Kes {item.price.toLocaleString()}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className='flex items-center space-x-2'>
                  <input
                    type='number'
                    min='0'
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className='w-16 p-2 border border-gray-300 rounded-md'
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className='text-red-600 hover:text-red-800 transition font-semibold'
                  >
                    Remove
                  </button>
                </div>

                {/* Subtotal */}
                <div className='mt-2 md:mt-0 text-right'>
                  <p className='font-bold'>Subtotal: Kes {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}

            {/* Total Price and Checkout Button */}
            <div className='mt-6 flex justify-between items-center'>
              <h3 className='text-xl font-bold'>Total: Kes {totalPrice.toLocaleString()}</h3>
              <button
                onClick={handleNavigate}
                className='px-6 py-2 bg-blue text-white font-semibold rounded-md hover:bg-blue-700 transition'
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
