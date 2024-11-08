import React from 'react'
import HandlePhoneLink from './HandlePhoneLink'
import whats from '../images/whatsapp-svgrepo-com.svg'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useAppSelector } from '../app/hooks'
import { Link } from 'react-router-dom'


const Navbar = () => {

    const cartItems = useAppSelector((state) => state.cart); // Adjust if your state is different

    // Calculate the total number of items in the cart
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className='top-0 sticky py-2 px-3 shadow-lg flex space-x-12 justify-between items-center max-w-screen min-w-screen bg-white'>
            <Link to='/'>
                <h1 className=' font-bold'>
                    <span className=' text-yellow'>BARAKA</span><br /><span className=' text-blue'>GAS</span><span>POINT</span>
                </h1>
            </Link>

            <div className=' flex items-center space-x-1'>
                <img className=' w-5 h-5 object-contain' src={whats} alt='call' />
                <div>
                    +<HandlePhoneLink phoneNumber={+254700200566} />
                </div>
            </div>
            <div className='relative'>
                <ShoppingCartIcon className='h-5 w-5' />
                {totalItems > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'>
                        {totalItems}
                    </span>
                )}
            </div>
        </nav>

    )
}

export default Navbar