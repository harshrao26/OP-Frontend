import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [
  'https://www.orra.co.in/media/wysiwyg/1920_x_700__DF_Banner___Desktop_1_Without_SBI_1.jpg',
  'https://www.orra.co.in/media/wysiwyg/Astra_Desktop_Banner.jpg',
  'https://www.orra.co.in/media/wysiwyg/1920_x_700__New_DR_Banner___Desktop_Without_SBI.jpg'
];

const CarouselContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 1500); // Change image every 1.5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className=" relative w-full">
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full object-cover "
            />
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute hidden md:block top-1/2 left-2 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full hover:bg-zinc-600 transition focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50"
      >
        {/* <FaChevronLeft size={20} /> */}
      </button>
      <button
        onClick={nextSlide}
        className="absolute hidden md:block top-1/2 right-2 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full hover:bg-zinc-600 transition focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50"
      >
        {/* <FaChevronRight size={20} /> */}
      </button>
    </div>
  );
};

export default CarouselContainer;