import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAppDispatch, useAppSelector } from '../app/hooks'; // Custom hook to access Redux store
import axios from 'axios'; // For making HTTP requests
import { addOrder } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';

const Checkout = () => {
    const dispatch = useAppDispatch()
  // State for customer details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Get cart items from Redux store
  const cartItems = useAppSelector((state) => state.cart);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (firstName && lastName && phoneNumber && deliveryLocation && cartItems.length > 0) {
      const orderData = {
        customerDetails: {
          first_name:firstName,
          last_name:lastName,
          phone: phoneNumber,
          location: deliveryLocation,
        },
        cartItems,
      };

      // Dispatch the addOrder action
      const resultAction = await dispatch(addOrder({ orderData }));
    //   console.log('idd ', resultAction.payload.order.order_number)
      if (addOrder.fulfilled.match(resultAction)) {
        setOrderPlaced(true);
        setOrderId(resultAction.payload.order.order_number); // Replace `id` with actual field returned by your API
        dispatch(clearCart());
    } else {
        alert('Failed to place the order. Please try again.');
      }
    } else {
      alert('Please fill in all the details and make sure your cart is not empty.');
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <section className='flex-grow mt-4 p-4 container mx-auto bg-white shadow-md rounded-md'>
        {!orderPlaced ? (
          <>
            <h2 className='text-2xl font-bold mb-4'>Checkout</h2>
            <form className='space-y-4'>
              <div className='flex flex-col md:flex-row md:space-x-4'>
                <input
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='flex-1 p-2 border border-gray-300 rounded-md mb-1'
                  required
                />
                <input
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='flex-1 p-2 border border-gray-300 rounded-md'
                  required
                />
              </div>
              <input
                type='tel'
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-md'
                required
              />
              <input
                type='text'
                placeholder='Delivery Location'
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-md'
                required
              />
            </form>

            {/* Order Summary */}
            <div className='mt-6'>
              <h3 className='text-xl font-bold mb-2'>Your Order</h3>
              <div className='space-y-2'>
                {cartItems.map((item) => (
                  <div key={item.id} className='flex justify-between items-center border-b pb-2'>
                    <p>{item.name} (x{item.quantity})</p>
                    <p>KES {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className='mt-4 text-right font-bold'>
                <p>Total: KES {totalPrice.toLocaleString()}</p>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className='mt-4 w-full py-2 bg-blue text-white font-semibold rounded-md hover:bg-blue-700 transition'
            >
              Place Order
            </button>
          </>
        ) : (
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-4'>Order Placed Successfully!</h2>
            <p>Thank you, {firstName} {lastName}. Your order has been placed.</p>
            <p>Order ID: {orderId}</p>
            <p>We will call you at {phoneNumber} to confirm the order shortly.</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;
