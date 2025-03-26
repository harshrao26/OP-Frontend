import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/customer/products/all");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={
                product.images && product.images.length > 0 
                  ? product.images[0] 
                  : product.image
              }
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
