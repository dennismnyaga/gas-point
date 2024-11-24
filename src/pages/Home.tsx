import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts, getProductError, getProductStatus, productCount, selectAllProduct } from '../features/products/productsSlice'
import ProductExcerpt from '../features/products/ProductExcerpt'
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';

const Home = () => {
    const dispatch = useAppDispatch()
    const allProducts = useAppSelector(selectAllProduct);
    const product_status = useAppSelector(getProductStatus);
    const product_error = useAppSelector(getProductError);
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
                <div className='flex m-auto space-x-4 mb-4 border-2 border-white w-fit rounded-md p-1'>
                    {['all', 'refill', 'sell', 'others'].map((category) => (
                        <div
                            key={category}
                            onClick={() => setFilter(category as 'refill' | 'sell' | 'others' | 'all')}
                            className={`px-3 py-1 rounded-lg cursor-pointer ${filter === category ? 'bg-blue text-white' : 'bg-white text-black'
                                }`}
                        >
                            <h5 className='text-lg font-semibold'>{category}</h5>
                        </div>
                    ))}
                </div>
                {/* Grid container for products */}
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {product_status === "loading" && (
                        <>
                        <div className='border p-1 rounded-lg bg-white shadow-md'>
                            <Skeleton variant="rounded" height={310} />
                            <h2 className='text-base whitespace-nowrap mt-2 flex items-center text-gray-500 font-bold mb-2'>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
                            </h2>
                          
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={50} />
                            <div className=' flex justify-center mt-2'>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
                            </div>
                            

                        </div>
                        <div className='border p-1 rounded-lg bg-white shadow-md'>
                            <Skeleton variant="rounded" height={310} />
                            <h2 className='text-base whitespace-nowrap mt-2 flex items-center text-gray-500 font-bold mb-2'>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
                            </h2>
                          
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={50} />
                            <div className=' flex justify-center mt-2'>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
                            </div>
                            

                        </div>
                        <div className='border p-1 rounded-lg bg-white shadow-md'>
                            <Skeleton variant="rounded" height={310} />
                            <h2 className='text-base whitespace-nowrap mt-2 flex items-center text-gray-500 font-bold mb-2'>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
                            </h2>
                          
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={50} />
                            <div className=' flex justify-center mt-2'>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
                            </div>
                            

                        </div>
                        <div className='border p-1 rounded-lg bg-white shadow-md'>
                            <Skeleton variant="rounded" height={310} />
                            <h2 className='text-base whitespace-nowrap mt-2 flex items-center text-gray-500 font-bold mb-2'>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
                            </h2>
                          
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={50} />
                            <div className=' flex justify-center mt-2'>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
                            </div>
                            

                        </div>
                        <div className='border p-1 rounded-lg bg-white shadow-md'>
                            <Skeleton variant="rounded" height={310} />
                            <h2 className='text-base whitespace-nowrap mt-2 flex items-center text-gray-500 font-bold mb-2'>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
                            </h2>
                          
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={50} />
                            <div className=' flex justify-center mt-2'>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
                            </div>
                            

                        </div>
                        <div className='border p-1 rounded-lg bg-white shadow-md'>
                            <Skeleton variant="rounded" height={310} />
                            <h2 className='text-base whitespace-nowrap mt-2 flex items-center text-gray-500 font-bold mb-2'>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
                            </h2>
                          
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={50} />
                            <div className=' flex justify-center mt-2'>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
                            </div>
                            

                        </div>
                        </>
                        
                    )}
                    {filteredProducts?.map((product) => (
                        <ProductExcerpt key={product.id} product={product} />
                    ))}
                </div>
            </section>
            <div className=' my-2 flex justify-center'>
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
