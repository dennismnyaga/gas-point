// @ts-nocheck
import React from 'react';
import getApiUrl from '../../../urlsPath';
import { useNavigate } from 'react-router-dom';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import FormattedAmount from '../../components/FormattedAmount';
import { useAppSelector, useAppDispatch } from '../../app/hooks'; // Custom hooks for accessing Redux store
import { addItem } from '../../features/cart/cartSlice'; // Import the addItem action
import { CartItem } from '../../features/cart/cartSlice'; // Import the CartItem type if needed

interface ProductExcerptProps {
    product: {
        id: string;
        brand: {
            id: string;
            name: string;
        };
        product_type: {
            id: string;
            name: string;
        };
        weight: {
            id: string;
            weight: string;
        };
        sold_as: {
            id: string;
            name: string;
        };
        name: string;
        price: number;
        description: string;
        date_added: string;
        image: string;
    };
}

const ProductExcerpt: React.FC<ProductExcerptProps> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart); // Access the cart from the Redux store

    // Check if the product is already in the cart
    const isInCart = cartItems.some((item: CartItem) => item.id === product.id);

    const imageUrl = `${getApiUrl()}${product.image}`;

    const handleAddToCart = () => {
        dispatch(addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }));
    };

    const handleViewCart = () => {
        navigate('/cart');
    };

    
    return (
        <div className='border p-1 rounded-lg bg-white shadow-md'>
            <div className='h-72'>
            <img onClick={() => navigate(`/product/${product.id}`)} src={product.image} alt='product' className='cursor-pointer w-full object-contain h-full rounded-md lg:h-fit' />

            </div>
            <h2 className='text-base whitespace-nowrap mt-2 flex items-center text-gray-500 font-bold mb-2'>
                {product.name} {product.weight.weight} <ArrowLongRightIcon className='h-8 w-12' /> {product.sold_as.name}
            </h2>
            <p className='text-gray-600'>{product.description}</p>
            <p className='text-lg font-semibold'><FormattedAmount amount={product.price} /></p>

            <div className='text-center mt-2'>
                {isInCart ? (
                    <button onClick={handleViewCart} className='bg-blue px-2 rounded-md font-bold text-white'>
                        View in Cart
                    </button>
                ) : (
                    <button onClick={handleAddToCart} className='bg-green-500 px-2 rounded-md font-bold text-white'>
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductExcerpt;
