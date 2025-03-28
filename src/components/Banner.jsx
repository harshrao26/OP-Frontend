import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import Lucide Icons
import bags from '../assets/product specfic banner/bags.png'
import cake from '../assets/product specfic banner/cake.png'
import elec from '../assets/product specfic banner/elec.png'
import home from '../assets/product specfic banner/home.png'
import meds from '../assets/product specfic banner/meds.png'
import nm from '../assets/product specfic banner/nm.png'
import ts from '../assets/product specfic banner/ts.png'
import datsbanner from '../assets/product specfic banner/datesbanner.jpeg'


const images = [
  bags,
  datsbanner,
  cake,
  elec,
  home,
  meds,
  nm,
  ts,
 
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Auto slide every 1 second
  useEffect(() => {
    resetTimer();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 1000);

    return () => {
      resetTimer();
    };
  }, [current]);

  const prevSlide = () => {
    resetTimer();
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    resetTimer();
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full  mx-auto ">
      {/* Banner Image */}
      <img
        src={images[current]}
        alt={`Banner ${current + 1}`}
        className="w-full h-auto object-cover shadow-lg"
      />
      

      {/* Prev Button */}
      {/* <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button> */}

      {/* Next Button */}
      {/* <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button> */}
    </div>
  );
};

export default BannerCarousel;
