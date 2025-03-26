import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://op-backend-lgam.onrender.com/api/customer/products/${id}`);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        } else if (data.image) {
          setMainImage(data.image);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchSuggested = async () => {
      try {
        const { data } = await axios.get("https://op-backend-lgam.onrender.com/api/customer/products/all");
        const filtered = data.filter(p => p._id !== id).slice(0, 6); // exclude current product
        setSuggested(filtered);
      } catch (error) {
        console.error("Error fetching suggested products:", error);
      }
    };

    fetchProduct();
    fetchSuggested();
  }, [id]);

  if (!product) return <p className="text-gray-500 text-center">Loading product details...</p>;

  const cartItem = cart.find(item => item.id === product._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Product Detail Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Image Section */}
        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[24rem] object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-[24rem] bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumbnail-${idx}`}
                  className={`w-20  object-cover rounded cursor-pointer border ${
                    mainImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Content Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-green-600 font-semibold text-2xl mt-2">₹{product.price}</p>

          {product.stock < 10 && (
            <p className="text-red-500 mt-2">Only a few left in stock!</p>
          )}

          {/* Add to Cart / Quantity Controls */}
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
              className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-md"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center mt-6">
              <button
                onClick={() => decreaseQuantity(product._id)}
                className="bg-gray-300 text-black px-4 py-2 rounded-l-md hover:bg-gray-400"
              >
                -
              </button>
              <span className="px-4 py-2 border">{quantityInCart}</span>
              <button
                onClick={() => increaseQuantity(product._id)}
                disabled={quantityInCart >= product.stock}
                className="bg-gray-300 text-black px-4 py-2 rounded-r-md hover:bg-gray-400 disabled:opacity-50"
              >
                +
              </button>
            </div>
          )}

          {/* Description */}
          <div
            className="text-gray-700 mt-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>

      {/* Suggested Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {suggested.map((item) => (
            <div
              key={item._id}
              className="border border-zinc-300 rounded-md p-3 hover:shadow-lg transition"
            >
              <img
                src={item.image || item.images?.[0]}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-sm font-medium mt-2 truncate">{item.name}</h3>
              <p className="text-green-600 font-semibold text-sm">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
