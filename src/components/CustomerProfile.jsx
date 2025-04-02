// CustomerDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Package, AlertCircle } from "lucide-react";

const CustomerDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          return;
        }
        const { data } = await axios.get("http://localhost:5001/api/customer/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(data);
      } catch {
        setError("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  if (error)
    return (
      <div className="text-red-500 flex items-center">
        <AlertCircle className="mr-1" /> {error}
      </div>
    );
  if (!profileData) return <div>Loading...</div>;

  const { profile, pastOrders, currentOrders } = profileData;

  return (
    <div className="p-4">
      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 ${activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 ${activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Orders
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center">
            <User className="mr-2" /> Profile
          </h2>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div>
          <h2 className="text-xl font-semibold flex items-center mb-2">
            <Package className="mr-2" /> Orders
          </h2>
          <div className="mb-4">
            <h3 className="font-semibold">Current Orders</h3>
            {currentOrders.length ? (
              currentOrders.map((order) => (
                <div key={order._id} className="p-2 border mb-2">
                  <p>Order ID: {order._id}</p>
                  {/* More details here */}
                </div>
              ))
            ) : (
              <p>No current orders</p>
            )}
          </div>
          <div>
            <h3 className="font-semibold">Past Orders</h3>
            {pastOrders.length ? (
              pastOrders.map((order) => (
                <div key={order._id} className="p-2 border mb-2">
                  <p>Order ID: {order._id}</p>
                  {/* More details here */}
                </div>
              ))
            ) : (
              <p>No past orders</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
