import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { DollarSign, Clock, List } from 'lucide-react';

const Seller = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5001/api/seller/products/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Store only the orders array from the response
        setOrders(res.data.orders || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Sum totalPrice for delivered orders
  const totalSale = useMemo(() => {
    return orders.reduce((acc, order) => {
      return order.status === 'Delivered'
        ? acc + (order.totalPrice || 0)
        : acc;
    }, 0);
  }, [orders]);

  // Count orders that are still pending
  const pendingOrders = useMemo(() => {
    return orders.filter(order => order.status === 'Pending').length;
  }, [orders]);

  return (
    <div className="container mx-auto p-4">
      {console.log(orders)}
      {console.log(pendingOrders)}
      {console.log(totalSale)}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Sales Card */}
        <div className="flex items-center p-4 bg-white rounded shadow">
          <DollarSign className="w-6 h-6 mr-2 text-green-500" />
          <div>
            <h2 className="text-lg font-medium">Total Sales</h2>
            <p className="text-sm">₹
            {totalSale}</p>
          </div>
        </div>
        {/* Pending Orders Card */}
        <div className="flex items-center p-4 bg-white rounded shadow">
          <Clock className="w-6 h-6 mr-2 text-yellow-500" />
          <div>
            <h2 className="text-lg font-medium">Pending Orders</h2>
            <p className="text-sm">{pendingOrders}</p>
          </div>
        </div>
        {/* Order History Card */}
        <div className="flex items-center p-4 bg-white rounded shadow">
          <List className="w-6 h-6 mr-2 text-blue-500" />
          <div>
            <h2 className="text-lg font-medium">Order History</h2>
            <p className="text-sm">{orders.length}</p>
          </div>
        </div>
      </div>
      {/* Order Table */}
      <div>
        <h2 className="text-xl font-bold mb-2">Order History</h2>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="py-2 px-4 border-b">{order._id}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">₹                {order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Seller;
