import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard"; // adjust path based on your structure
import Filters from './Filters'
import Loader from "./Loader";
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
    return <p className="text-center text-gray-500 mt-10 flex items-center justify-center h-screen w-full "> <Loader /> </p>;
  }

  return (
    <div className=" w-full">
      
      <Filters className="" />
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
