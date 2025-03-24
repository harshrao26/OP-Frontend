import React from "react";

const Gender = () => {
  return (
    <div className="transition-all ease-in-out">
      {/* <h1 className="text-center md:text-4xl text-2xl font-semibold pb-2 tracking-tight py-4 md:py-8 ">
       Shop by Gender
      </h1> */}
      <div className="px- flex gap-2 transition-all ease-in-out duration-75">
        <div className="relative  transition-all ease-in-out duration-75">
            <img src="https://www.orra.co.in/media/wysiwyg/Shop_by_gender_Female_1020_X_650-min.jpg" alt="" />
            <h1 className="absolute insert-0 text-white right-4 top-4 md:text-xl text-xs uppercase">Shop for WOMEN</h1>
        </div>
        <div className="relative  transition-all ease-in-out">
            <h1 className="absolute insert-0 text-white left-4 top-4 md:text-xl text-xs uppercase">Shop for MEN</h1>
            <img src="https://www.orra.co.in/media/wysiwyg/Shop_by_gender_Male_1020_X_650-min.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Gender;