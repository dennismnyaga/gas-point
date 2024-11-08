// Home.js
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts, selectAllProduct } from '../features/products/productsSlice'
import ProductExcerpt from '../features/products/ProductExcerpt'

const Home = () => {
    const dispatch = useAppDispatch()
    const allProducts = useAppSelector(selectAllProduct)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <>
            <Navbar />
            <section className='mt-4 p-2'>
                <div className='flex space-x-4 mb-4'>
                    <div className='bg-white px-3 py-1 rounded-lg'>
                        <h5 className='text-lg font-semibold'>refill</h5>
                    </div>
                    <div className='bg-white px-3 py-1 rounded-lg'>
                        <h1 className='text-lg font-semibold'>sell</h1>
                    </div>
                    <div className='bg-white px-3 py-1 rounded-lg'>
                        <h1 className='text-lg font-semibold'>others</h1>
                    </div>
                </div>

                {/* Grid container for products */}
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {allProducts.map((product) => (
                        <ProductExcerpt key={product.id} product={product} />
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home
