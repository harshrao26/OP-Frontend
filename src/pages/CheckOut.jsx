import React, { useState, useEffect } from 'react';
import { CreditCard, QrCode, DollarSign } from 'lucide-react';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import banner1 from '../assets/banner/buy2.jpeg';
import banner2 from '../assets/banner/tws.jpeg';
import banner3 from '../assets/banner/shila.jpeg';

const Carousel = () => {
  const images = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full h-48 md:h-64 overflow-hidden relative rounded-lg mb-6 shadow-lg">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
};

const CheckoutPage = () => {
  const [shipping, setShipping] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [upiId, setUpiId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('razorpay');

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const isLucknow = shipping.city.trim().toLowerCase() === 'lucknow';

  const { cart, decreaseQuantity, increaseQuantity, removeFromCart } = useCart();

  // Calculate pricing details
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const platformFee = 50;
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const gst = (subtotal * 0.18).toFixed(2);
  const total = (subtotal + platformFee + deliveryCharge + parseFloat(gst)).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLucknow) {
      alert('Shipping is available only in Lucknow.');
      return;
    }
    console.log('Order submitted', { shipping, selectedPayment, upiId });
    // Add your Razorpay integration or other payment logic here.
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Promotional Carousel */}
      <Carousel />

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Checkout Form */}
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={shipping.name}
                    onChange={handleShippingChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={shipping.address}
                    onChange={handleShippingChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                  <div className="sm:w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shipping.city}
                      onChange={handleShippingChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="sm:w-1/2 mt-4 sm:mt-0">
                    <label className="block text-gray-700 font-medium mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shipping.postalCode}
                      onChange={handleShippingChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={shipping.country}
                    onChange={handleShippingChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                {!isLucknow && shipping.city.trim() !== '' && (
                  <p className="text-red-500 text-sm">Shipping is available only in Lucknow.</p>
                )}
              </section>

              {/* Payment Method */}
              {isLucknow && (
                <section className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                  <div className="flex flex-col sm:flex-row justify-between">
                    <label className="flex items-center mb-4 sm:mb-0">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={selectedPayment === 'razorpay'}
                        onChange={() => setSelectedPayment('razorpay')}
                        className="mr-2"
                      />
                      <CreditCard className="w-6 h-6 mr-2" /> Razorpay
                    </label>
                    <label className="flex items-center mb-4 sm:mb-0">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={selectedPayment === 'upi'}
                        onChange={() => setSelectedPayment('upi')}
                        className="mr-2"
                      />
                      <QrCode className="w-6 h-6 mr-2" /> UPI Payment
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={selectedPayment === 'cod'}
                        onChange={() => setSelectedPayment('cod')}
                        className="mr-2"
                      />
                      <DollarSign className="w-6 h-6 mr-2" /> Cash on Delivery
                    </label>
                  </div>
                  {selectedPayment === 'upi' && (
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Enter UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="example@upi"
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </div>
                  )}
                </section>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Price Summary */}
          <div className="md:w-1/3 bg-gray-50 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Price Summary</h3>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Delivery Charge</span>
              <span className={subtotal > 500 ? "text-green-500" : ""}>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
