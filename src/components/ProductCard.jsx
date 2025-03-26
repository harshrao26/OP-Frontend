import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, name, description, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  // Calculate old price and discount
  const oldPrice = Math.round(price * 1.38); // 38% more than current price
  const discountPercentage = Math.round(((oldPrice - price) / oldPrice) * 100);

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 border border-gray-200 transition-transform hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700 truncate">{name}</h3>
        {/* Render the HTML description with truncation */}
        <div
          className="text-gray-500 text-sm mt-1 overflow-hidden line-clamp-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="flex justify-between items-center mt-3">
          <div>
            <span className="text-green-600 font-bold text-lg">₹{price}</span>
            <span className="text-gray-500 line-through text-sm ml-2">₹{oldPrice}</span>
            <span className="text-red-500 text-sm ml-2">({discountPercentage}% off)</span>
          </div>
          <div className="flex gap-3">
            <button className="text-gray-600 hover:text-red-500">
              <Heart size={20} />
            </button>
            <button className="text-gray-600 hover:text-blue-500">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
