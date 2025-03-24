// components/LastChanceOffer.jsx
import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const LastChanceOffer = () => {
  // Set the fixed deadline once
  const deadline = new Date().getTime() + (1 * 86400000 + 14 * 3600000); // 1 day 14 hours
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(deadline);
      if (remaining.total <= 0) {
        clearInterval(timer);
      }
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeRemaining(deadline) {
    const total = deadline - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  }

  return (
    <div
      className="flex h-[60vh] flex-col md:flex-row items-center justify-between bg-gradient-to-r from-white to-yellow-50 px-10 py-12"
      style={{
        backgroundImage:
          "url('https://s3-alpha-sig.figma.com/img/962a/9e2d/21f4267196d78415a64deaeb966330e7?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lC4nFkpsG3E3fcA2jlGiMthY~dD053H9xm~BvfUY8Q8eVBzQjuQvdmfktBiEU4HlQTTbgo7RBrIM0biCi6RLRluvSgRKBVRGJ9BkYuWvhm9Oqbr8dtYAm5JAFN-hBkPj5kn6ZstmfascV-P4jel0yUbWBAj4L89pLP0LNzXz-Pc-tH9RMoIB925WlNgMZg5N7yMKRGj6vqQf8a7Xk9wsZl-PU5jTo4lxcCmTK7X9d9xWbpaViCj2dbFP97pRD3WElafKV5Ndo9iZKrW1~ECisX4aB0YuA4PkO0H7yQai4VHfn~Mol9XEHSbr3pgPHCrWednu0AsKEtzTo7BSWwfy7Q__')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Text Section */}
      <div className="text-center md:text-left max-w-lg">
        <h1 className="text-4xl font-semibold mb-2">Last Chance Offers</h1>
        <p className="text-gray-600 mb-6">Get Them Before They’re Gone</p>
        <div className="flex justify-center md:justify-start space-x-4 mb-6">
          {[
            { label: "DAY", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINS", value: timeLeft.minutes },
            { label: "SECS", value: timeLeft.seconds },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-full px-4 py-2 shadow text-center">
              <div className="text-xl font-bold">{String(item.value).padStart(2, "0")}</div>
              <div className="text-xs text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
        <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default LastChanceOffer;
