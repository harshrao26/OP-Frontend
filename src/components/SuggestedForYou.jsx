import React from "react";
import ProductCard from "./ProductCard";

const SuggestedForYou = () => {
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Vitamin C Serum",
      price: 499,
      oldPrice: 699,
      discount: 30,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      title: "Cashew Nuts (500g)",
      price: 599,
      oldPrice: 799,
      discount: 25,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      title: "Chocolate Cake",
      price: 999,
      oldPrice: 1299,
      discount: 23,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <h2 className="text-2xl font-semibold mb-4">🎯 Suggested for You</h2>

      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedForYou;
