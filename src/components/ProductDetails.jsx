import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/customer/products/${id}`);
        setProduct(data);
        // Set the main image to the first available image or fallback to product.image
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        } else if (data.image) {
          setMainImage(data.image);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-gray-500 text-center">Loading product details...</p>;
  }

  const cartItem = cart.find(item => item.id === product._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full md:w-96 h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full md:w-1/3 h-96 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="mt-4 flex space-x-2">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                    mainImage === img ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          {/* Render formatted description */}
          <div
            className="text-gray-600 mt-2"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <div className="mt-4">
            <span className="text-green-600 font-bold text-2xl">₹{product.price}</span>
          </div>
          {product.stock < 10 && (
            <p className="text-red-500 mt-2">Only a few left in stock!</p>
          )}
          {quantityInCart === 0 ? (
            <button
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: mainImage,
                  stock: product.stock,
                })
              }
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center mt-4">
              <button
                onClick={() => decreaseQuantity(product._id)}
                className="bg-gray-400 text-white px-4 py-2 rounded-l-md"
              >
                -
              </button>
              <span className="px-4 py-2 border">{quantityInCart}</span>
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
