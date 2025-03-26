import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sofa from '../assets/sofa.png'
import bags2 from '../assets/bags2.png'
const products = [
  { id: 2, image: 'https://mixdryfruit.com/cdn/shop/files/Mixed-Dryfruits-nuts.png?v=1721831661&width=990', name: 'Dry Fruits', link: 'category/dry-fruits' },
  { id: 3, image: 'https://png.pngtree.com/png-clipart/20240321/original/pngtree-bottle-medicine-drugs-png-image_14648681.png', name: 'Medicine', link: 'category/medicines' },
  { id: 4, image: 'https://printify.com/wp-content/uploads/2023/10/Unisex-Jersey-Short-Sleeve-Tee-with-design.jpg', name: 'Customized Tshirts', link: 'category/t-shirts' },
  { id: 5, image: sofa, name: 'Sofa', link: 'category/furniture' },
  { id: 1, image: bags2, name: 'Bags', link: 'category/bags' },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  return (
    <div className="w-full mx-auto p-4">
      <p className='font-semibold text-2xl pl-4 py-4'>Shop By Category</p>
      <div className="relative flex items-center justify-center">
        <button onClick={handlePrev} className="absolute left-0 bg-white rounded-full px-4 py-2 shadow-lg z-10 hover:bg-gray-200 transition duration-300">❮</button>
        <div className="w-full overflow-hidden">
          <div className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-1/4 p-2">
                <Link to={`/${product.link}`} className="block text-center">
                  <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300" />
                  <p className="mt-2 text-lg font-medium">{product.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleNext} className="absolute right-0 bg-white rounded-full px-4 py-2 shadow-lg z-10 hover:bg-gray-200 transition duration-300">❯</button>
      </div>
    </div>
  );
};

export default Carousel;
