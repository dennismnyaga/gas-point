import React from 'react'
import getApiUrl from '../../../urlsPath'
import { useNavigate } from 'react-router-dom';
// import { Product } from './productsSlice' // adjust path as needed

interface ProductExcerptProps {
    product: {
        id: string;
  brand: {
    id: string;
    name:string;
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
    }
    name: string;
    price: number;
    description: string;
    date_added: string;
    image: string
    }
}



const ProductExcerpt: React.FC<ProductExcerptProps> = ({ product }) => {
    const navigate = useNavigate();

    const imageUrl = `${getApiUrl()}${product.image}`;

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };
    
    return (
        <div className='border p-4 rounded-lg bg-white shadow-md'>
            <img  onClick={handleCardClick} src={imageUrl} alt='product' className='w-full h-48 object-cover rounded-md' />
            <h2 className='text-xl font-bold mt-2'>{product.name}</h2>
            <p className='text-gray-600'>{product.description}</p>
            <p className='text-lg font-semibold'>Kes{product.price}</p>
        </div>
    )
}

export default ProductExcerpt
