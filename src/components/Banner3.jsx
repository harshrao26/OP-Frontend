import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="overflow-hidden pb-4 px-8">
                    {/* <h1 className="text-center md:text-4xl text-2xl font-semibold pb-4 tracking-tight ">Our Collection</h1> */}

        <div className=" overflow-hidden rounded-xl w-full flex items-center justify-center">
      <img
        src="https://www.orra.co.in/media/wysiwyg/1438_x_476_banner.jpg"
        alt="Banner"
        className=" object-cover h-full overflow-hidden  transition-transform duration-300 hover:scale-105"
      />
    </div>
    </div>
  );
};

export default Banner;