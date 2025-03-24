import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSwipeable } from "react-swipeable"; // Swipe support for mobile
import df from "../assets/df.jpeg";
import cake from "../assets/cake.png";
import mouse from "../assets/mouse.png";
import tshirt from "../assets/tshirt.png";
import meds from "../assets/meds.png";
import home from "../assets/home.png";
import furn from "../assets/furn.png";
import bags from "../assets/bags.png";

const categories = [
  { name: "Nature Media", image: "https://naturemedica.in/upload/logo/27122024082042AMlogo.webp", filters: ["Vitamin C Serum", "Glutathione", "More Products"] },
  { name: "Dry Fruits", image: df, filters: ["Almonds", "Cashews", "Raisins"] },
  { name: "Cake", image: cake, filters: ["Chocolate", "Vanilla", "Designer Cakes"] },
  { name: "Electronics", image: mouse, filters: ["Mobile", "Laptops", "Accessories"] },
  { name: "T-Shirts ", image: tshirt, filters: ["Men", "Women", "Kids"] },
  { name: "Medicines", image: meds, filters: ["Prescription", "Supplements", "Wellness"] },
  { name: "Home Essentials", image: home, filters: ["Cleaning", "Storage", "Kitchenware"] },
  { name: "Furniture", image: furn, filters: ["Sofas", "Tables", "Beds"] },
  { name: "Bags", image: bags, filters: ["Backpacks", "Handbags", "Luggage"] }
];

const CategoryDropdown = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(null);

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setMobileIndex(null),
    onSwipedRight: (eventData) => setMobileIndex(eventData.initial[0] / 100),
  });

  return (
    <div {...swipeHandlers} className="bg-white shadow-md py-4">
      {/* 🌐 Desktop View (Hover Dropdown) */}
      <div className="hidden md:flex justify-center space-x-6">
        {categories.map((category, index) => (
          <div
            key={category.name}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Category Button */}
            <div className="flex flex-col items-center cursor-pointer">
              <img src={category.image} alt={category.name} className="w-10 h-10 rounded-full" />
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium">{category.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Dropdown Content */}
            {hoveredIndex === index && (
              <div className="absolute z-50 left-0 mt-2 w-48 bg-white shadow-xl rounded-md p-2">
                {category.filters.map((filter) => (
                  <div key={filter} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                    {filter}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 📱 Mobile View (Scrollable) */}
      <div className="md:hidden overflow-x-auto whitespace-nowrap flex space-x-4 px-4 scrollbar-hide">
        {categories.map((category, index) => (
          <div
            key={category.name}
            className="relative flex flex-col items-center cursor-pointer min-w-[80px]"
            onClick={() => setMobileIndex(mobileIndex === index ? null : index)}
          >
            <img src={category.image} alt={category.name} className="w-14 h-14 rounded-full" />
            <span className="text-xs font-medium mt-1">{category.name}</span>

            {/* Dropdown */}
            {mobileIndex === index && (
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-40 bg-white shadow-md rounded-md p-2">
                {category.filters.map((filter) => (
                  <div key={filter} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                    {filter}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown;
