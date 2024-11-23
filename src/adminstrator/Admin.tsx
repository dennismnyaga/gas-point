import React, { useEffect } from 'react'
import Header from './Header'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchOrder, selectAllOrders, updateOrderStatus } from '../features/ADMIN/orders/adminOrdersSlice';
import FormattedAmount from '../components/FormattedAmount';

const Admin = () => {

  const dispatch = useAppDispatch();

  const all_orders = useAppSelector(selectAllOrders);


  useEffect(() => {
    dispatch(fetchOrder())
  }, [dispatch])



  const handleDispatch = (orderId: string) => {
    dispatch(updateOrderStatus({ orderId, status: true }));
  };


  return (
    <div>
      <Header />

      <section className="p-2">
        <h2 className="font-bold underline mb-2 text-center">Orders</h2>
        <table className="min-w-full text-left text-gray-900 border-collapse divide-y divide-gray-200">
          <thead className="text-sm font-semibold">
            <tr className="text-gray-600 bg-blue">
              <th className="px-3 py-4 whitespace-nowrap">Order No</th>
              <th className="px-3 py-4 whitespace-nowrap">Customer Name</th>
              <th className="px-3 py-4 whitespace-nowrap">Location</th>
              <th className="px-3 py-4 whitespace-nowrap">Order Items</th>
              <th className="px-3 py-4 whitespace-nowrap">Dispatched</th>
              <th className="px-3 py-4 whitespace-nowrap">Delivered</th>
              <th className="px-3 py-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-800">
            {all_orders?.map((order) => (
              <tr key={order.order_number}>
                <td className="px-3 py-4 whitespace-nowrap">{order.order_number}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {order.customer?.first_name} {order.customer?.last_name}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">{order.location}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.product.id}>
                        {item.quantity} x {item.product.name} (<FormattedAmount amount={item.product.price} />)
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">{order.dispatched ? <p className=' text-green-800 font-bold'>yes</p> : <p className='text-red-800 font-bold'>no</p>}</td>
                <td className="px-3 py-4 whitespace-nowrap">{order.delivered ? 'Yes' : 'No'}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDispatch(order.id)} className="bg-blue-500 px-2 py-1 rounded">
                    Mark as Dispatched
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Admin