import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

const CartPage = () => {
  const { cart, decreaseQuantity, increaseQuantity, removeFromCart } = useCart();

  // Calculate total price
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const platformFee = 50;
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const gst = (subtotal * 0.18).toFixed(2);
  const total = (subtotal + platformFee + deliveryCharge + parseFloat(gst)).toFixed(2);

  // Check if user is logged in by looking for a token
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    console.log("Cart contents:", cart);
  }, [cart]);
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">-</button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4 hover:underline">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary Section */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Price Summary</h3>
            <div className="flex justify-between text-gray-600 mb-2"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600 mb-2"><span>Platform Fee</span><span>₹{platformFee}</span></div>
            <div className="flex justify-between text-gray-600 mb-2"><span>Delivery Charge</span><span className={subtotal > 500 ? "text-green-500" : ""}>₹{deliveryCharge}</span></div>
            <div className="flex justify-between text-gray-600 mb-2"><span>GST (18%)</span><span>₹{gst}</span></div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg text-gray-800"><span>Total</span><span>₹{total}</span></div>
            <div className="mt-6">
              {isLoggedIn ? (
                <Link to='/checkout' className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-center">
                  Proceed to Checkout
                </Link>
              ) : (
                <Link to='/login' className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-center">
                  Please Log In to Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
