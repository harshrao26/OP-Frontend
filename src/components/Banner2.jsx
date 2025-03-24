import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-2/3 relative bg-gray-100 p-6 rounded-lg flex flex-col items-center justify-center text-center shadow-md">
      <ShoppingBag className="text-yellow-500 w-10 h-10" />
      <h1 className="text-2xl font-bold">Top Selling Smartphones</h1>
      <p className="text-gray-500 text-sm">Latest Technology, Best Brands</p>
      <img
        src="https://m.media-amazon.com/images/I/71y2b2nAlQL._AC_SL1500_.jpg" // Smartphone image
        alt="Top Smartphones"
        className="w-48 mt-4"
      />
      <button className="mt-4 flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
        <span>Explore Now</span>
        <ArrowRight />
      </button>
    </div>
  );
};

export default Banner;
