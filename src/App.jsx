import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import NatureMedica from "./components/NatureMedica.jsx";
import DryFruits from "./components/DryFruits.jsx";
import Cake from "./components/Cake.jsx";
import Electronics from "./components/Electronics.jsx";
import Tshirts from "./components/Tshirts.jsx";
import Medicines from "./components/Medicines.jsx";
import HomeEssentials from "./components/HomeEssentials.jsx";
import Furniture from "./components/Furniture.jsx";
import Bags from "./components/Bags.jsx";
import SellerLogin from "./components/seller/SellerLogin.jsx";
import SellerDashboard from "./components/seller/SellerDashboard.jsx";
import { useAuth } from "./context/AuthContext.jsx";
export default function App() {
  const { user } = useAuth() || {}; // ✅ Ensure `user` is always defined

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/nature-medica" element={<NatureMedica />} />
        <Route path="/category/nature-media" element={<NatureMedica />} />
        <Route path="/category/dry-fruits" element={<DryFruits />} />
        <Route path="/category/cakes" element={<Cake />} />
        <Route path="/category/electronics" element={<Electronics />} />
        <Route path="/category/t-shirts" element={<Tshirts />} />
        <Route path="/category/medicines" element={<Medicines />} />
        <Route path="/category/home-essentials" element={<HomeEssentials />} />
        <Route path="/category/furniture" element={<Furniture />} />
        <Route path="/category/bags" element={<Bags />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/product/:id" element={<ProductDetails />} />

       
        {/* Protected Routes for Sellers */}
        <Route
          path="/seller/dashboard"
          element={user?.role === "seller" ? <SellerDashboard /> : <Navigate to="/login" />}
        />

        {/* Protected Routes for Admin */}
        <Route
          path="/admin/dashboard"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </>
  );
}
