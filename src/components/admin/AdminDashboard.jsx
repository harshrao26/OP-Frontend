import React, { useState, useEffect } from "react";
import axios from "axios";
import { Home, Users, Package, BarChart2 } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const token = localStorage.getItem("adminToken");


// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="w-64 bg-gray-800 text-white p-4">
    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
    <nav>
      <ul>
        <li
          onClick={() => setActiveTab("overview")}
          className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === "overview" && "bg-gray-700"}`}
        >
          <Home className="mr-2" size={20} /> Overview
        </li>
        <li
          onClick={() => setActiveTab("sellers")}
          className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === "sellers" && "bg-gray-700"}`}
        >
          <Users className="mr-2" size={20} /> Sellers
        </li>
        <li
          onClick={() => setActiveTab("products")}
          className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === "products" && "bg-gray-700"}`}
        >
          <Package className="mr-2" size={20} /> Products
        </li>
        <li
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === "analytics" && "bg-gray-700"}`}
        >
          <BarChart2 className="mr-2" size={20} /> Analytics
        </li>
      </ul>
    </nav>
  </aside>
);

// Overview Component
const Overview = ({ data }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Overview</h2>
    <p>{data.message}</p>
  </div>
);

// Sellers Component
const SellerDetailsModal = ({ seller, onClose, onStatusChange }) => {
  const handleApprove = async (e) => {
    e.stopPropagation();
    try {
      await axios.put(
        `https://op-backend-lgam.onrender.com/api/admin/sellers/${seller._id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onStatusChange("Approved");
    } catch (error) {
      console.error("Error approving seller", error);
    }
  };


  const handleDisable = async (e) => {
    e.stopPropagation();
    try {
      await axios.put(
        `https://op-backend-lgam.onrender.com/api/admin/sellers/${seller._id}/disabled`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onStatusChange("Disabled");
    } catch (error) {
      console.error("Error disabling seller", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#141414b1] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-6xl w-full relative">
        <h2 className="text-2xl font-bold mb-4">Seller Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seller.idProof && (
            <div>
              <img src={seller.idProof} alt="ID Proof" className="rounded w-full h-auto" />
            </div>
          )}
          <div className="space-y-2">
            <p><strong>Shop Name:</strong> {seller.shopName}</p>
            <p><strong>Email:</strong> {seller.email}</p>
            <p><strong>Owner:</strong> {seller.ownerName}</p>
            <p><strong>Contact:</strong> {seller.contactNo}</p>
            <p><strong>Address:</strong> {seller.sellerAddress}</p>
            <p><strong>GST Number:</strong> {seller.gstNumber}</p>
            <p><strong>Years in Business:</strong> {seller.yearsInBusiness}</p>
            <p><strong>Rating:</strong> {seller.averageRating}</p>
            <p><strong>Account Status:</strong> <span className="text-green-500 font-semibold text-xl">{seller.accountStatus}</span></p>
            <p><strong>Pending Balance:</strong> {seller.pendingBalance}</p>
            <p><strong>Amount Paid:</strong> {seller.amountPaidByAdmin}</p>
            <p><strong>Orders Shipped:</strong> {seller.ordersShipped}</p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Approve
          </button>
          <button
            onClick={handleDisable}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Disable
          </button>
        </div>
        <button onClick={onClose} className="mt-4 text-red-500 absolute right-4 top-0">
          Close
        </button>
      </div>
    </div>
  );
};


const Sellers = ({ sellers }) => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerList, setSellerList] = useState(sellers);

  // Opens modal with seller details
  const handleSellerClick = (seller) => {
    setSelectedSeller(seller);
  };

  // Closes the modal
  const handleModalClose = () => {
    setSelectedSeller(null);
  };

  // Updates seller status locally after API call
  const handleStatusChange = (newStatus) => {
    setSellerList((prevList) =>
      prevList.map((seller) =>
        seller._id === selectedSeller._id ? { ...seller, accountStatus: newStatus } : seller
      )
    );
    setSelectedSeller({ ...selectedSeller, accountStatus: newStatus });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sellers</h2>
      <ul className="space-y-2">
        {sellerList.map((seller) => (
          <li
            key={seller._id}
            className="p-2 bg-white rounded shadow cursor-pointer flex justify-between items-center"
            onClick={() => handleSellerClick(seller)}
          >
            <span>{seller.shopName || seller.email}</span>
            <span className="text-sm text-gray-600">{seller.accountStatus}</span>
          </li>
        ))}
      </ul>
      {selectedSeller && (
        <SellerDetailsModal
          seller={selectedSeller}
          onClose={handleModalClose}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};


// Products Component
const Products = ({ products }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Products</h2>
    <ul className="space-y-2">
      {products.map((product) => (
        <li key={product._id} className="p-2 bg-white rounded shadow">
          {product.name}
        </li>
      ))}
    </ul>
  </div>
);

// Analytics Component
const Analytics = ({ data }) => {
  const chartData = {
    labels: ["Sellers", "Products"],
    datasets: [
      {
        label: "Count",
        data: [data.totalSellers, data.totalProducts],
        backgroundColor: ["#4F46E5", "#10B981"],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      <div className="bg-white p-4 rounded shadow">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("https://op-backend-lgam.onrender.com/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(res.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load dashboard.");
      }
    };
    fetchDashboard();
  }, []);

  if (message) return <p className="p-4 text-red-500">{message}</p>;
  if (!dashboardData) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 bg-gray-100">
        {activeTab === "overview" && <Overview data={dashboardData} />}
        {activeTab === "sellers" && <Sellers sellers={dashboardData.sellers} />}
        {activeTab === "products" && <Products products={dashboardData.products} />}
        {activeTab === "analytics" && <Analytics data={dashboardData} />}
      </main>
    </div>
  );
};

export default Dashboard;
