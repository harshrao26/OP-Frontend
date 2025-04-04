import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Store, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import axios from "axios";
import logo from "../assets/logoo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("👋 Welcome, " + user.name);
    }
  }, [user]);

  // Fetch suggestions on search query change (client-side filtering)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const { data } = await axios.get("https://op-backend-lgam.onrender.com/api/customer/products/all");
          const filtered = data.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuggestions(filtered);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  return (
    <nav className="bg-white shadow-md px-4 py-3 w-full z-50 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>

        {/* Search Bar - Visible on both mobile and desktop */}
        <div className="w-full md:w-1/2 relative mx-4">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="w-full bg-transparent outline-none ml-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Suggestions Dropdown */}
          {searchQuery && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50">
              {suggestions.map((product) => (
                <div
                  key={product._id}
                  onClick={() => {
                    setSearchQuery("");
                    setSuggestions([]);
                    navigate(`/product/${product._id}`);
                  }}
                  className="cursor-pointer hover:bg-gray-100 p-2 text-sm flex gap-2 items-center"
                >
                  <img src={product?.images[0]} alt={product.name} className="h-16 w-16 object-cover rounded" />
                  <span>{product.name}</span>
                </div>
              ))}
              <div
                onClick={() => {
                  setSearchQuery("");
                  setSuggestions([]);
                  navigate("/results");
                }}
                className="cursor-pointer hover:bg-gray-100 p-2 text-sm text-blue-600 font-semibold border-t border-gray-200"
              >
                See all results
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/seller-register" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
            <Store className="w-5 h-5" />
            <span>Become a Seller</span>
          </Link>
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
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                Profile
              </Link>
              <LogOut
                className="w-8 h-8 p-2 bg-red-500 rounded-full text-white cursor-pointer hover:bg-red-600"
                onClick={logout}
              />
            </div>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu with Overlay */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300 ease-in-out"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-gray-100 shadow-lg p-6 z-50 transform transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-end">
              <X className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(false)} />
            </div>
            <div className="flex flex-col space-y-6 mt-8">
              <Link to="/seller" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <Store className="w-5 h-5" />
                <span>Become a Seller</span>
              </Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <ShoppingCart className="w-6 h-6" />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
              {user && (
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-700">{user.name.trim()}</span>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600">
                    Profile
                  </Link>
                  <button onClick={logout} className="flex items-center space-x-2 text-red-500 hover:text-red-600">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
              {!user && (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600">
                  Login
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
