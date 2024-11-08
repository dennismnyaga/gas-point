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
  const [quantity, setQuantity] = useState(1);

  const productStatus = useAppSelector(getSingleProductStatus);


  console.log('id ', productId)
  useEffect(() => {
    dispatch(fetchProduct(productId.id))
  }, [dispatch])


  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({ id: product.id, name: product.name, price: product.price, quantity }));
      console.log(`Added ${quantity} of ${product.name} to the cart`);
    }
  };

  // if (!product) {
  //   return <div>Loading...</div>; // Replace with a loading spinner if preferred
  // }


  const imageUrl = `${getApiUrl()}${product?.image}`;

  return (
    <>
      <Navbar />
      {/* <section className='mt-4 p-2'>

    </section> */}
      <section className='bg-white container mx-auto p-4 mt-6'>
        {/* Loading state */}
        {productStatus === 'loading' && (
          <div className='text-center py-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Product Image */}
            <div className='flex justify-center'>
              {/* <img
                src={imageUrl}
                alt={product.name}
                className='max-w-full h-auto rounded-md'
              /> */}
              <Skeleton variant="rectangular" width={450} height={350} className='max-w-full h-auto rounded-md' />
            </div>

            {/* Product Information */}
            <div className='p-4'>
              {/* <h1 className='text-2xl font-bold mb-2'>{product.name}</h1> */}
              <Skeleton className='text-2xl font-bold mb-2' />
              {/* <p className='text-lg font-semibold text-gray-800 mb-4'>Kes {product.price}</p> */}
              <Skeleton className='text-lg font-semibold text-gray-800 mb-4' />

              {/* Quantity and Add to Cart */}
              <div className='flex items-center space-x-2 mb-4'>
                {/* <input
                  type='number'
                  min='1'
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className='w-16 p-2 border border-gray-600 rounded-md'
                /> */}
                <Skeleton className='w-16 p-2  rounded-md' />
                {/* <button
                  onClick={handleAddToCart}
                  className='px-4 py-2 bg-blue-600 text-white font-bold lowercase rounded-md hover:bg-blue-700 transition'
                >
                  Add to Cart
                </button> */}
                <Skeleton className='px-4 py-2 bg-blue-600 text-white font-bold lowercase rounded-md hover:bg-blue-700 transition' />
              </div>

              {/* Product Description */}
              <div className='mt-4'>
                {/* <h2 className='text-xl font-semibold mb-2'>Product Details</h2> */}
                <Skeleton className='text-xl font-semibold mb-2' />
                {/* <p className='text-gray-700'>{product.description}</p> */}
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
                  min='1'
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
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
      </section>
      <Footer />
    </>
  )
}

export default ProductDetails