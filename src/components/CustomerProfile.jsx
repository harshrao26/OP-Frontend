import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Package,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Loader from "./Loader";

// Reusable Badge component
const StatusBadge = ({ text }) => {
  const styles = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Delivered: "bg-green-100 text-green-800",
    Shipped: "bg-blue-100 text-blue-800",
    "Prepared for Shipping": "bg-purple-100 text-purple-800",
    Default: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`text-xs px-2 py-1 rounded font-medium ${
        styles[text] || styles.Default
      }`}
    >
      {text}
    </span>
  );
};

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((prev) => !prev);

  const product = order.products?.[0]?.productId;

  return (
    <div className="bg-white border  border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow mb-4">
      {/* Summary row */}
      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img
            src={product?.images?.[0] || "https://via.placeholder.com/80"}
            alt={product?.name}
            className="w-20 h-20 object-cover rounded "
          />
          <div>
            <p className="font-semibold text-blue-700 text-sm">{product?.name}</p>
            <p className="text-sm text-gray-600">₹{product?.price}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
          <div className="flex gap-2">
            <StatusBadge text={order.paymentStatus} />
            <StatusBadge text={order.status} />
          </div>
          <button
            onClick={toggle}
            className="text-blue-600 hover:underline flex items-center gap-1 mt-2 md:mt-0 w-28 "
          >
            {expanded ? (
              <>
                Hide Details <ChevronUp size={16} />
              </>
            ) : (
              <>
                View Details <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable content */}
      <div
        className={`transition-all overflow-hidden duration-300 ease-in-out ${
          expanded ? "max-h-screen p-4 pt-0" : "max-h-0"
        }`}
      >
        <div className="text-sm text-gray-700">
          <div className="border-t py-3">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Quantity:</strong> {order.products?.[0]?.quantity}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
          </div>

          <div className="bg-gray-50 rounded p-3">
            <p className="font-semibold text-sm mb-2">Shipping Address</p>
            <p>{order.shippingAddress?.fullName}</p>
            <p>{order.shippingAddress?.addressLine1}</p>
            <p>
              {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
              {order.shippingAddress?.postalCode}
            </p>
            <p>{order.shippingAddress?.country}</p>
            <p>Phone: {order.shippingAddress?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersTab = ({ orders, type }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">
      {type === "current" ? "Current Orders" : "Past Orders"}
    </h2>
    {orders.length ? (
      orders.map((order) => <OrderCard key={order._id} order={order} />)
    ) : (
      <p className="text-gray-500">No {type} orders.</p>
    )}
  </div>
);

const ProfileTab = ({ profile }) => (
  <div>
    <h2 className="text-2xl font-bold flex items-center mb-4">
      <User className="mr-2" /> Profile
    </h2>
    <div className="space-y-2 text-sm text-gray-700">
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Phone:</strong> {profile.phone}
      </p>
    </div>
  </div>
);

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://op-backend-lgam.onrender.com/api/customer/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfileData(res.data);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchData();
  }, []);

  if (error)
    return (
      <div className="text-red-600 p-4 flex items-center gap-2">
        <AlertCircle size={18} /> {error}
      </div>
    );

  if (!profileData) return <div className="p-4 h-screen w-full flex items-center justify-center">

<Loader />
  </div>;

  const { profile, currentOrders, pastOrders } = profileData;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-blue-600 text-white">
          <div className="text-center py-5 font-bold text-2xl border-b border-blue-400">
            Dashboard
          </div>
          <div className="flex flex-col">
            <button
              className={`p-4 text-left hover:bg-blue-700 ${
                activeTab === "profile" && "bg-blue-700"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="inline mr-2" /> Profile
            </button>
            <button
              className={`p-4 text-left hover:bg-blue-700 ${
                activeTab === "current" && "bg-blue-700"
              }`}
              onClick={() => setActiveTab("current")}
            >
              <Package className="inline mr-2" /> Current Orders
            </button>
            <button
              className={`p-4 text-left hover:bg-blue-700 ${
                activeTab === "past" && "bg-blue-700"
              }`}
              onClick={() => setActiveTab("past")}
            >
              <Package className="inline mr-2" /> Past Orders
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-white">
          {activeTab === "profile" && <ProfileTab profile={profile} />}
          {activeTab === "current" && (
            <OrdersTab orders={currentOrders} type="current" />
          )}
          {activeTab === "past" && (
            <OrdersTab orders={pastOrders} type="past" />
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
