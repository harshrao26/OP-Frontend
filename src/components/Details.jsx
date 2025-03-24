import { FaCheckCircle, FaShieldAlt, FaGem, FaExchangeAlt, FaSyncAlt, FaUndoAlt, FaShieldVirus, FaTruck, FaTags, FaGift, FaMoneyBillWave, FaShoppingCart, FaCreditCard } from "react-icons/fa";

const offers = [
  { icon: <FaTags className="text-xl text-blue-500" />, text: "🎉 New User Offer – Get 10% OFF on your first order! Use code: WELCOME10" },
  { icon: <FaTruck className="text-xl text-blue-500" />, text: "🚚 Free Shipping – On all orders above ₹999" },
  { icon: <FaShoppingCart className="text-xl text-blue-500" />, text: "🔥 Flash Sale – Up to 50% OFF on select products! Limited time only!" },
  { icon: <FaCreditCard className="text-xl text-blue-500" />, text: "💳 Bank Offers – Get 5% Cashback on purchases made via credit/debit cards" },
  { icon: <FaGift className="text-xl text-blue-500" />, text: "🎁 Buy 1 Get 1 Free – Available on selected categories" },
  { icon: <FaMoneyBillWave className="text-xl text-blue-500" />, text: "💰 Zero Commission – List your first 10 products for FREE!" },
  { icon: <FaCheckCircle className="text-xl text-blue-500" />, text: "100% Certified Jewellery" },
  { icon: <FaShieldAlt className="text-xl text-blue-500" />, text: "BIS Hallmarked Gold Jewellery" },
  { icon: <FaGem className="text-xl text-blue-500" />, text: "Platinum Certified Jewellery" },
  { icon: <FaExchangeAlt className="text-xl text-blue-500" />, text: "Lifetime Exchange" },
  { icon: <FaSyncAlt className="text-xl text-blue-500" />, text: "Lifetime Buyback" },
  { icon: <FaUndoAlt className="text-xl text-blue-500" />, text: "7 Days Return Policy" },
  { icon: <FaShieldVirus className="text-xl text-blue-500" />, text: "1 Year Free Insurance" },
  { icon: <FaGem className="text-xl text-blue-500" />, text: "6 Months Free Product Upgrade" },
];
const Marquee = () => {
  return (
    <div className="overflow-hidden py-4 relative">
      <div
        className="flex whitespace-nowrap animate-marquee"
      >
        {/* Content repeated twice for smooth looping */}
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 300s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

const MarqueeContent = () => (
  <div className="w-full  overflow-hidden">
  <div className="flex animate-marquee whitespace-nowrap">
    {offers.map((offer, index) => (
      <div key={index} className="flex items-center mx-4">
        {offer.icon}
        <span className="ml-2 text-gray-700 font-medium">{offer.text}</span>
      </div>
    ))}
  </div>
</div>
);

export default Marquee;