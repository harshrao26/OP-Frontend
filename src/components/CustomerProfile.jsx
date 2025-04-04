import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Package, AlertCircle, X } from "lucide-react";

const CustomerDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          return;
        }
        const { data } = await axios.get(
          "http://localhost:5001/api/customer/auth/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfileData(data);
      } catch {
        setError("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  if (error)
    return (
      <div className="flex items-center text-red-500 p-4">
        <AlertCircle className="mr-2" /> {error}
      </div>
    );
  if (!profileData) return <div className="p-4">Loading...</div>;

  const { profile, pastOrders, currentOrders } = profileData;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-l mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-blue-500 text-white">
          <div className="p-6 border-b border-blue-400 text-center font-bold text-2xl">
            Dashboard
          </div>
          <nav className="flex flex-col">
            <button
              onClick={() => setActiveTab("profile")}
              className={`p-4 text-left hover:bg-blue-600 flex items-center gap-2 ${
                activeTab === "profile" && "bg-blue-600"
              }`}
            >
              <User className="w-5 h-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`p-4 text-left hover:bg-blue-600 flex items-center gap-2 ${
                activeTab === "orders" && "bg-blue-600"
              }`}
            >
              <Package className="w-5 h-5" />
              Orders
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold flex items-center mb-4">
                <User className="mr-2" /> Profile Details
              </h2>
              <div className="space-y-3 text-gray-700">
                <div>
                  <span className="font-semibold">Name:</span> {profile.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {profile.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {profile.phone}
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold flex items-center mb-4">
                <Package className="mr-2" /> Your Orders
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Orders */}
                <div>
                  {/* Orders Grid */}
                  {currentOrders.length ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentOrders.map((order) => (
                        <div
                          key={order._id}
                          className="cursor-pointer  p-4"
                          onClick={() => handleOrderClick(order)}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Package className="text-gray-600 w-5 h-5" />
                            <p className="font-semibold text-gray-800">
                              Order ID:{" "}
                              <span className="font-normal">{order._id}</span>
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Status:</span>{" "}
                            {order.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No current orders.</p>
                  )}

                  {/* Modal Popup */}
                  {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000a1] bg-opacity-50">
                      {/* Modal Content */}
                      <div className="relative bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg">
                        {/* Close Button */}
                        <button
                          onClick={handleClose}
                          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-6 h-6" />
                        </button>

                        {/* Order Details */}
                        <h2 className="text-xl font-semibold mb-4">
                          Order Details
                        </h2>

                        <div className="mb-2">
                          <span className="font-semibold">Order ID:</span>{" "}
                          {selectedOrder._id}
                        </div>

                        <div className="mb-2">
                          <span className="font-semibold">Status:</span>{" "}
                          {selectedOrder.status}
                        </div>

                        <div className="mb-2">
                          <span className="font-semibold">Total Amount:</span> ₹
                          {selectedOrder.totalAmount}
                        </div>

                        {/* Shipping Address */}
                        <div className="mt-4 bg-gray-50 p-3 rounded">
                          <h3 className="font-semibold mb-2">
                            Shipping Address
                          </h3>
                          <p className="text-sm">
                            <strong>Full Name:</strong>{" "}
                            {selectedOrder.shippingAddress?.fullName}
                          </p>
                          <p className="text-sm">
                            <strong>Phone:</strong>{" "}
                            {selectedOrder.shippingAddress?.phone}
                          </p>
                          <p className="text-sm">
                            <strong>Address Line 1:</strong>{" "}
                            {selectedOrder.shippingAddress?.addressLine1}
                          </p>
                          <p className="text-sm">
                            <strong>City:</strong>{" "}
                            {selectedOrder.shippingAddress?.city}
                          </p>
                          <p className="text-sm">
                            <strong>State:</strong>{" "}
                            {selectedOrder.shippingAddress?.state}
                          </p>
                          <p className="text-sm">
                            <strong>Country:</strong>{" "}
                            {selectedOrder.shippingAddress?.country}
                          </p>
                          <p className="text-sm">
                            <strong>Postal Code:</strong>{" "}
                            {selectedOrder.shippingAddress?.postalCode}
                          </p>
                        </div>

                        {/* Product(s) Info */}
                        <div className="mt-4 bg-gray-50 p-3 rounded">
                          <h3 className="font-semibold mb-2">
                            Product Details
                          </h3>
                          {/* If the order has a single product ID, just display it. If multiple, map over them. */}
                          {Array.isArray(selectedOrder.productId) ? (
                            <ul className="list-disc list-inside text-sm space-y-1">
                              {selectedOrder.productId.map((prod, idx) => (
                                <li key={idx}>Product ID: {prod}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm">
                              Product ID: {selectedOrder.productId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Past Orders */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Past Orders</h3>
                  {pastOrders.length ? (
                    pastOrders.map((order) => (
                      <div
                        key={order._id}
                        className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow bg-gray-50"
                      >
                        <p className="font-semibold">Order ID:</p>
                        <p>{order._id}</p>
                        {/* Additional order details can be added here */}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No past orders.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
