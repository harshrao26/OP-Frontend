import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/customer/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-gray-500 text-center">Loading product details...</p>;
  }

  // Find cart item
  const cartItem = cart.find((item) => item.id === product._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/3 h-96 object-cover rounded-lg" />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4">
            <span className="text-green-600 font-bold text-2xl">₹{product.price}</span>
          </div>

          {/* Show stock message if low stock */}
          {product.stock < 10 && (
            <p className="text-red-500 mt-2">Only a few left in stock!</p>
          )}

          {/* Add to Cart Button */}
          {quantityInCart === 0 ? (
            <button
              onClick={() => addToCart({ id: product._id, name: product.name, price: product.price, image: product.image, stock: product.stock })}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center mt-4">
              {/* Decrease Button */}
              <button
                onClick={() => decreaseQuantity(product._id)}
                className="bg-gray-400 text-white px-4 py-2 rounded-l-md"
              >
                -
              </button>

              {/* Quantity Display */}
              <span className="px-4 py-2 border">{quantityInCart}</span>

              {/* Increase Button */}
              <button
                onClick={() => increaseQuantity(product._id)}
                disabled={quantityInCart >= product.stock}
                className="bg-gray-400 text-white px-4 py-2 rounded-r-md disabled:opacity-50"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
