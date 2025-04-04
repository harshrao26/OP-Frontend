import React, { useState, useEffect } from "react";
import axios from "axios";
import { Package, X } from "lucide-react";

const SellerOrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders for the seller on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://op-backend-lgam.onrender.com/api/seller/products/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  // Handle status update change
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const token = localStorage.getItem("token");
      // Update order status on the backend
      const res = await axios.put(
        `https://op-backend-lgam.onrender.com/api/seller/products/orders/${selectedOrder._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update the order in local state
      const updatedOrder = { ...selectedOrder, status: newStatus };
      setSelectedOrder(updatedOrder);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === selectedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              onClick={() => handleOrderClick(order)}
              className="cursor-pointer border p-4 rounded-lg shadow hover:shadow-md transition-shadow bg-gray-50"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Package className="w-5 h-5 text-gray-600" />
                <p className="font-semibold text-gray-800">
                  Order ID: <span className="font-normal">{order._id}</span>
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No orders available.</p>
      )}

      {/* Modal Popup */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000af] bg-opacity-50">
          <div className="relative bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="mb-2">
              <span className="font-semibold">Order ID:</span> {selectedOrder._id}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              {selectedOrder.status}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Total Amount:</span> ₹
              {selectedOrder.totalAmount}
            </div>

            {/* Dropdown for updating order status */}
            <div className="mt-4">
              <label className="font-semibold" htmlFor="status">
                Update Order Status:
              </label>
              <select
                id="status"
                value={selectedOrder.status}
                onChange={handleStatusChange}
                className="ml-2 p-1 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Prepared for Shipping">
                  Prepared for Shipping
                </option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Shipping Address */}
            <div className="mt-4 bg-gray-50 p-3 rounded">
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p className="text-sm">
                <strong>Full Name:</strong> {selectedOrder.shippingAddress?.fullName}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}
              </p>
              <p className="text-sm">
                <strong>Address:</strong>{" "}
                {selectedOrder.shippingAddress?.addressLine1}
              </p>
              <p className="text-sm">
                <strong>City:</strong> {selectedOrder.shippingAddress?.city}
              </p>
              <p className="text-sm">
                <strong>State:</strong> {selectedOrder.shippingAddress?.state}
              </p>
              <p className="text-sm">
                <strong>Country:</strong> {selectedOrder.shippingAddress?.country}
              </p>
              <p className="text-sm">
                <strong>Postal Code:</strong> {selectedOrder.shippingAddress?.postalCode}
              </p>
            </div>

            {/* Product Details */}
            <div className="mt-4 bg-gray-50 p-3 rounded">
              <h3 className="font-semibold mb-2">Product Details</h3>
              {selectedOrder.products?.length ? (
                <ul className="list-disc list-inside text-sm space-y-1">
                  {selectedOrder.products.map((prod, idx) => (
                    <li key={idx}>
                      Product ID: {prod.productId} (Quantity: {prod.quantity})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">No product details available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrdersDashboard;
