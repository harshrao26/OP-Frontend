// CustomerOrderList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
// And then use: jwt_decode.default(token)
import { ShoppingCart, CheckCircle, AlertCircle } from "lucide-react";

const CustomerOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token is missing");
          return;
        }
        const decoded = jwt_decode(token);
        const customerId = decoded._id; // Adjust if your token payload differs

        const { data } = await axios.get(`http://localhost:5001/api/orders/customer/${customerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data.orders);
      } catch (err) {
        setError("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <ShoppingCart className="mr-2" /> Your Orders
      </h1>
      {error && (
        <div className="text-red-500 mb-4 flex items-center">
          <AlertCircle className="mr-1" /> {error}
        </div>
      )}
      <ul className="space-y-4">
        {orders.map(order => (
          <li
            key={order._id}
            className="p-4 border rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>Total: ${order.totalAmount}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>
            {order.status === "Delivered" ? (
              <CheckCircle size={24} className="text-green-500" />
            ) : (
              <ShoppingCart size={24} className="text-blue-500" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerOrderList;
