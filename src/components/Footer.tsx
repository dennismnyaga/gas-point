import { PhoneArrowDownLeftIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Footer = () => {
    return (
        <footer className='   bg-slate-300'>
            <h1 className='text-center font-semibold mb-3 text-green-600'>CONNECT WITH US</h1>
            <div className=' flex flex-col space-y-1 items-center'>
                <div className='flex items-center space-x-2'>
                    <PhoneArrowDownLeftIcon className='h-5 w-5' />
                    <h3>0700200566</h3>
                </div>
                <div>
                    <h3>barakagaspoint@gmail.com</h3>
                </div>
                <div>
                    <h3>barakagaspoint.com</h3>
                </div>
            </div>

        </footer>
    )
}

export default Footer