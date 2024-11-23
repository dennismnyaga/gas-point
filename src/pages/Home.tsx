import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts, productCount, selectAllProduct } from '../features/products/productsSlice'
import ProductExcerpt from '../features/products/ProductExcerpt'
import Pagination from '@mui/material/Pagination';

const Home = () => {
    const dispatch = useAppDispatch()
    const allProducts = useAppSelector(selectAllProduct);
    const productCounts = useAppSelector(productCount)
    const [filter, setFilter] = useState<'refill' | 'sell' | 'others' | 'all'>('all');
    const [page, setPage] = useState(1);


    useEffect(() => {
        dispatch(fetchProducts({ page }))
    }, [dispatch, page])

    const filteredProducts = filter === 'all'
        ? allProducts
        : allProducts.filter(product => product.sold_as.name === filter);


    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <section className='flex-grow mt-4 p-2'>
                <div className='flex space-x-4 mb-4'>
                    <div onClick={() => setFilter('refill')} className='bg-white px-3 py-1 rounded-lg cursor-pointer'>
                        <h5 className='text-lg font-semibold'>refill</h5>
                    </div>
                    <div onClick={() => setFilter('sell')} className='bg-white px-3 py-1 rounded-lg cursor-pointer'>
                        <h1 className='text-lg font-semibold'>sell</h1>
                    </div>
                    <div onClick={() => setFilter('others')} className='bg-white px-3 py-1 rounded-lg cursor-pointer'>
                        <h1 className='text-lg font-semibold'>others</h1>
                    </div>
                </div>

                {/* Grid container for products */}
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {filteredProducts?.map((product) => (
                        <ProductExcerpt key={product.id} product={product} />
                    ))}
                </div>
            </section>
            <div className=' mb-2 flex justify-center'>
                    <Pagination
                        count={Math.ceil(productCounts / 8)}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        shape="rounded" />
                </div>
            <Footer />
        </div>
    )
}

export default Home
