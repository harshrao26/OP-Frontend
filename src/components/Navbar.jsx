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

  // Show wave emoji on page load
  useEffect(() => {
    if (user) {
      console.log("👋 Welcome, " + user.name);
    }
  }, [user]);

  // Fetch suggestions on search query change (simple client-side filtering)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const { data } = await axios.get("https://op-backend-lgam.onrender.com/api/customer/products/all");
          // Filter products by name (case-insensitive)
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
    <nav className="bg-white shadow-md md:px-6 px-2 py-3 w-full z-200  ">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>

        {/* Search Bar - Hidden on Small Screens */}
        <div className="md:w-1/2 w-60  relative ">
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
                  {console.log(product)}
                  <img src={product?.images[0]} alt="" className="h-20 flex p-2"/>
                  {product.name}
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
          <Link to="/seller-register" className="flex items-center space-x-1">
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

          {/* User Section */}
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 whitespace-nowrap capitalize">
                {/* 👋 {user.name.trim().split(" ")[0]} */}
              </span>
              <Link to='/profile'>
                Profile
              </Link>
              <LogOut
                className="w-8 h-8 p-2 bg-red-500 rounded-full text-white cursor-pointer"
                onClick={logout}
              />
            </div>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-gray-100 p-4 rounded-md">
          <Link to="/seller" className="flex items-center space-x-1">
            <Store className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700">Become a Seller</span>
          </Link>
          <Link to="/cart" className="flex items-center space-x-1 relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="text-gray-700">Cart</span>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 whitespace-nowrap">{user.name.trim()}</span>
            </div>
          )}
          {user ? (
            <div className="flex items-center space-x-2">

              <Link to='/profile'>
                Profile
              </Link>


              <LogOut
                className="w-5 h-5 text-red-500 cursor-pointer"
                onClick={logout}
              />
            </div>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
