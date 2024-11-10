// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { fetchProduct, getSingleProductStatus, selectSingleProduct } from '../features/singleProduct/singleProductSlice';
import getApiUrl from '../../urlsPath';
import { addItem } from '../features/cart/cartSlice';
import Skeleton from '@mui/material/Skeleton';
import FormattedAmount from '../components/FormattedAmount';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const productId = useParams();
  const product = useAppSelector(selectSingleProduct);
  const [quantity, setQuantity] = useState('1');

  const productStatus = useAppSelector(getSingleProductStatus);


  const handleQuantityChange = (e) => {
    const value = e.target.value;
  
    // Allow empty input or any numeric string
    if (value === '' || /^\d+$/.test(value)) {
      setQuantity(value);
    }
  };

  useEffect(() => {
    dispatch(fetchProduct(productId.id))
  }, [dispatch])


  // const handleAddToCart = () => {
  //   if (product) {
  //     dispatch(addItem({ id: product.id, name: product.name, price: product.price, quantity, image: product.image }));
  //   }
  // };

  const handleAddToCart = () => {
    const parsedQuantity = Math.max(1, Number(quantity)); // Ensure a minimum of 1 when adding to the cart
  
    if (product) {
      dispatch(addItem({ id: product.id, name: product.name, price: product.price, quantity: parsedQuantity, image: product.image }));
    }
  
    // Reset input to default value after adding to cart
    setQuantity('1');
  };

  const imageUrl = `${getApiUrl()}${product?.image}`;

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      {/* <section className='mt-4 p-2'>

    </section> */}
      <section className='flex-grow bg-white container mx-auto p-4 mt-6'>
        {/* Loading state */}
        {productStatus === 'loading' && (
          <div className='text-center py-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {/* Product Image */}
              <div className='flex justify-center'>

                <Skeleton variant="rectangular" width={450} height={350} className='max-w-full h-auto rounded-md' />
              </div>

              <div className='p-4'>
                <Skeleton className='text-2xl font-bold mb-2' />
                <Skeleton className='text-lg font-semibold text-gray-800 mb-4' />

                <div className='flex items-center space-x-2 mb-4'>

                  <Skeleton className='w-16 p-2  rounded-md' />

                  <Skeleton className='px-4 py-2 bg-blue-600 text-white font-bold lowercase rounded-md hover:bg-blue-700 transition' />
                </div>

                <div className='mt-4'>
                  <Skeleton className='text-xl font-semibold mb-2' />
                  <Skeleton className='text-xl font-semibold mb-2' />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Details */}
        {product && (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Product Image */}
            <div className='flex justify-center'>
              <img
                src={imageUrl}
                alt={product.name}
                className='max-w-full h-auto rounded-md'
              />
            </div>

            {/* Product Information */}
            <div className='p-4'>
              <h1 className='flex items-center  text-3xl text-gray-500 font-bold mb-2'>{product.name} <ArrowLongRightIcon className='h-8 w-12' /> {product.sold_as?.name} </h1>
              <p>Brand: {product.brand?.name}</p>
              <p className='text-lg font-semibold text-gray-800 mb-4'>
                <FormattedAmount amount={product.price} />
              </p>
              {/* <p className='text-lg font-semibold text-gray-800 mb-4'>Kes {product.price}</p> */}

              {/* Quantity and Add to Cart */}
              <div className='flex items-center space-x-2 mb-4'>
                <input
                  type='number'
                  min='0'
                  value={quantity}
                  onChange={handleQuantityChange}
                  className='w-16 p-2 border border-gray-600 rounded-md'
                />
                <button
                  onClick={handleAddToCart}
                  className='px-4 py-2 bg-blue-600 text-black font-bold bg-blue lowercase rounded-md hover:bg-green-200 transition'
                >
                  Add to Cart
                </button>
              </div>

              {/* Product Description */}
              <div className='mt-4'>
                <h2 className='text-xl font-semibold mb-2'>Product Details</h2>
                <p className='text-gray-700'>{product.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Display a message if no product is found */}
        {productStatus === 'succeeded' && !product && (
          <div className='text-center py-4'>
            <p>Product not found.</p>
          </div>
        )}

        {/* <div className='mt-8'>
          <h2 className='text-2xl font-bold mb-4'>Related Products</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {product.relatedProducts?.map((relatedProduct) => (
              <div key={relatedProduct.id} className='border p-4 rounded-lg shadow-md'>
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className='w-full h-32 object-cover mb-2 rounded-md'
                />
                <h3 className='text-lg font-bold'>{relatedProduct.name}</h3>
                <p className='text-gray-600'>Kes {relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </div> */}

      </section>
      <Footer />
    </div>
  )
}

export default ProductDetails