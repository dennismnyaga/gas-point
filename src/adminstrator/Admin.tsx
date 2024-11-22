import React from 'react'
import Header from './Header'

const Admin = () => {
  return (
    <div>
      <Header />

      <section className='p-2'>
        <h2 className=' font-bold underline mb-2 text-center'>All customers</h2>
        <table className='min-w-full text-left text-gray-900 border-collapse divide-y divide-gray-200'>
          <thead className="text-sm font-semibold ">
            <tr className="text-gray-600 bg-blue ">
              <th className="px-3 py-4 whitespace-nowrap">First name</th>
              <th className="px-3 py-4 whitespace-nowrap">Last name</th>
              <th className="px-3 py-4 whitespace-nowrap">Phone</th>
              <th className="px-3 py-4 whitespace-nowrap">Delivered</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            <tr className=' text-center'>
              <td className="px-3 py-4 whitespace-nowrap ">Dennis</td>
              <td className="px-3 py-4 whitespace-nowrap ">Nyaga</td>
              <td className="px-3 py-4 whitespace-nowrap ">+254 700200566</td>
              <td className="px-3 py-4 whitespace-nowrap ">true</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Admin