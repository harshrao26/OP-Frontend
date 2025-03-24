import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
export default function App() {
  return (
   <>
   <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<CartPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <h1></h1>
          </ProtectedRoute>
        }
      />
              <Route path="/product/:id" element={<ProductDetails />} />

    </Routes>
    <Footer />
   </>
  );
}