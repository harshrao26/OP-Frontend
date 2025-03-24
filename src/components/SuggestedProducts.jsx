import React from "react";
import ProductCard from "./ProductCard";

const SuggestedProducts = () => {
  const products = [
    {
      image: "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg", // MacBook Air
      title: "Apple MacBook Air M3",
      price: "97,990",
      oldPrice: "1,14,900",
      discount: 15,
    },
    {
      image: "https://m.media-amazon.com/images/I/71d3xzKNfRL._AC_SL1500_.jpg", // MacBook Pro
      title: "Apple MacBook Pro M3",
      price: "1,49,900",
      oldPrice: "",
      discount: 0,
    },
  ];

  return (
    <div className="w-1/3 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Suggested for You</h2>
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default SuggestedProducts;
