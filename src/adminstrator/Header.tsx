import React from 'react'
import { BiMessageAdd } from 'react-icons/bi'
import { PiPersonFill } from 'react-icons/pi'

const Header = () => {

    return (
        <header className=' flex justify-between p-2 items-center'>
            <h1 className=' uppercase font-bold text-3xl'>Admin</h1>
            <div className=' flex items-center space-x-2'>
                <div className=' relative'>
                    <div className='bg-gray shadow-2xl border-2 border-green-800 p-1 rounded-full'>
                        <PiPersonFill className='text-green-800 w-8 h-8' />
                    </div>
                    <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-lg">3</span>
                </div>
                <div className=' relative'>
                    <div className='bg-gray shadow-2xl border-2 border-green-800 p-1 rounded-full'>
                        <BiMessageAdd className='text-green-800 w-8 h-8' />
                    </div>
                    <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-lg">3</span>
                </div>
            </div>
        </header>
    )
}

export default Header