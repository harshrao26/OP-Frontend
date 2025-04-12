import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Package, X } from "lucide-react";

const SellerOrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://op-backend-lgam.onrender.com//api/seller/products/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (order) => setSelectedOrder(order);
  const handleClose = () => setSelectedOrder(null);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://op-backend-lgam.onrender.com//api/seller/products/orders/${selectedOrder._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedOrder = { ...selectedOrder, status: newStatus };
      setSelectedOrder(updatedOrder);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Package className="text-blue-600" /> Seller Orders
      </h1>

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Payment</th>
                <th className="py-2 px-4 text-left">Shipping</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">City</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
  {orders.map((order) => (
    <tr key={order._id} className="border-t">
      <td className="py-2 px-4">{order._id}</td>

      {/* Payment Status with color badge */}
      <td className="py-2 px-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            order.paymentStatus === "Paid"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {order.paymentStatus}
        </span>
      </td>

      {/* Shipping Status with color badge */}
      <td className="py-2 px-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            order.status === "Delivered"
              ? "bg-green-100 text-green-800"
              : order.status === "Shipped"
              ? "bg-blue-100 text-blue-800"
              : order.status === "Prepared for Shipping"
              ? "bg-purple-100 text-purple-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {order.status}
        </span>
      </td>

      <td className="py-2 px-4">₹{order.totalAmount}</td>
      <td className="py-2 px-4">{order.shippingAddress?.fullName}</td>
      <td className="py-2 px-4">{order.shippingAddress?.city}</td>
      <td className="py-2 px-4 text-center">
        <button
          onClick={() => handleViewDetails(order)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <Eye size={16} /> View
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={22} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
              </p>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Update Status
                </label>
                <select
                  className="w-full border px-2 py-1 rounded"
                  value={selectedOrder.status}
                  onChange={handleStatusChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Prepared for Shipping">
                    Prepared for Shipping
                  </option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div className="mt-4 bg-gray-50 p-3 rounded">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedOrder.shippingAddress?.fullName}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {selectedOrder.shippingAddress?.addressLine1},{" "}
                  {selectedOrder.shippingAddress?.city},{" "}
                  {selectedOrder.shippingAddress?.state},{" "}
                  {selectedOrder.shippingAddress?.postalCode},{" "}
                  {selectedOrder.shippingAddress?.country}
                </p>
              </div>

              <div className="mt-4 bg-gray-50 p-3 rounded">
                <h3 className="font-semibold mb-2">Product Details</h3>
                {selectedOrder.products?.length > 0 ? (
                  <ul className="space-y-4">
                    {selectedOrder.products.map((prod, idx) => {
                      const product = prod.productId;
                      return (
                        <li key={idx} className="flex items-center gap-4">
                          <img
                            src={product?.images?.[0]}
                            alt={product?.name}
                            className="w-16 h-16 object-cover rounded border"
                          />
                          <div>
                            <p className="font-medium text-sm">
                              {product?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {prod.quantity} | ₹{product?.price}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm">No product info available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrdersDashboard;
