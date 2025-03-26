import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard"; // adjust path based on your structure

const NatureMedicaProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNatureMedica = async () => {
      try {
        const res = await axios.get("https://op-backend-lgam.onrender.com/api/customer/products/all");
        const filtered = res.data.filter((item) => item.brand === "Nature Medica");
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching Nature Medica products:", err);
      }
    };

    fetchNatureMedica();
  }, []);

  if (products.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Loading Nature Medica products...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nature Medica Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.image || product.images?.[0]}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default NatureMedicaProducts;
