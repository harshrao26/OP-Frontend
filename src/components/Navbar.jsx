import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Store, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  // Show wave emoji on page load
  useEffect(() => {
    if (user) {
      console.log("👋 Welcome, " + user.name);
    }
  }, [user]);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-2xl font-bold text-blue-600">Online Planet</Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-1/3 bg-gray-100 px-3 py-2 rounded-md">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          className="w-full bg-transparent outline-none ml-2 text-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        <Link to="/seller" className="flex items-center space-x-1">
          <Store className="w-5 h-5 text-gray-700" />
          <span className="text-gray-700">Become a Seller</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 whitespace-nowrap">👋 {user.name.trim()}</span>
            <LogOut className="w-5 h-5 text-red-500 cursor-pointer" onClick={logout} />
          </div>
        ) : (
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
