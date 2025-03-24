import React, { useState, useEffect } from 'react';

const products = [
  { id: 2, image: 'https://mixdryfruit.com/cdn/shop/files/Mixed-Dryfruits-nuts.png?v=1721831661&width=990', name: 'Dry Fruits' },
  { id: 3, image: 'https://png.pngtree.com/png-clipart/20240321/original/pngtree-bottle-medicine-drugs-png-image_14648681.png', name: 'Medicine' },
  { id: 4, image: 'https://printify.com/wp-content/uploads/2023/10/Unisex-Jersey-Short-Sleeve-Tee-with-design.jpg', name: 'Customized Tshits' },
  { id: 5, image: 'https://s3-alpha-sig.figma.com/img/f731/c3e3/b9bcc9239900c51a2108883912eb4b0e?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GS9~PGnukU~7x8bngyVFjXEYmgJxCzKmGDMwhRZPXfWqMLgAz77NvmEuyyOvRUBA5pzwEC7cbXGnIkA72CB2rhyOwEmxwUH6O1tB~CQOBFoOHiwzBG2wzpBHWeuIdS8WwnJJdPlaTNxgF3mKQv0eud62xRt4WdMi4Gwz8es7qgNqq82dA7xDjqxMiBQ1Nkbp6ruN0jp1scSZokQwYfxQL3~mMdw3vksiGnWI~ma8A9mucokIaBO4CVC5LYW7031YdBNY1LK1gyqgz2zj35TcQGWCVbRpc3edYdMdVk6zBttwKhtJgRRCC08A-sq4xaJMlJ0C7nsY3VUtjKMex4eOnQ__', name: 'Sofa' },
  { id: 1, image: 'https://s3-alpha-sig.figma.com/img/2d8f/c8de/f9b3248df63fc8af8b273387c27a2153?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GXRf3vrLgKz1yg5fmE7GqOFJK~GFNIhJUaLl2jeZ9ujX4omI76HYA-JbsFNWr5JXhzgE7UII30kccvico1KeHA1JJlrgZjWfyZif1idoFX1Nernic-7bmF25RfWZ1waV2PrFIHFULGY786vJmg69tiYIngDE54h~lGVNe5m844BTmJGwQ7NfeAhpmaDRYj0freEnMp7wabcNXqwHhFrZLPzI50oSWLiYDyvmPkiZ~Mv4hY-k43jCSfk0gnbNex0dU1zXaELn5WmYr1mw1GEj2jMZYTG6MZ1GHkigGl4IIywzDWn3pJfGYbEBril6wGwrdGM4wsNZgb4rb6sd7UnrCA__', name: 'Bags' },
  { id: 6, image: 'https://s3-alpha-sig.figma.com/img/62ae/dba6/2bb270450eebffdf55d43af88ee4fee1?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VshKG9CFIeXcxlnqcCbMxQ~NcJOx4WAWXoqZSW8o3f0LQz7q9PLelnb5DBDWSy4-pnQ6PacKkdAs8Bnu8Mke5MttpmRSXMZFvuU~xuWmSDaBqsl38JvrwV28UlnoG8hXVM4VVKbIoFDz2IBsZ~CIe1kQk8kZxErC3Mc~W3InYi7bfvbBXZXoeCa63g0GwMU~F2WIuXv10zij9B2u0yXsEoFlD83mbYkBHJDE8l7jvGphAAUQKIBngpVOT88IpgHy-KuM39xW137WqD9wDDhU1NfRQaTtJ2ibFfNEiaTjnA~IEFIlAzpB5KrgMxIQA6-CPKaKCNSxjoVYK99UB3BdEg__', name: 'Timeless Charm Diamond Necklace Set' },
  { id: 7, image: 'https://via.placeholder.com/300x200?text=Necklace+7', name: 'Radiant Opulence Diamond Necklace Set' },
  { id: 8, image: 'https://via.placeholder.com/300x200?text=Necklace+8', name: 'Majestic Brilliance Diamond Necklace Set' },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Show 1 item per page on small screens
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2); // Show 2 items per page on medium screens
      } else {
        setItemsPerPage(4); // Show 4 items per page on large screens
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const displayedProducts = products.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  return (
    <div className="w-full mx-auto p-4">
            <p className='font-semibold text-2xl pl-4 py-4'>Shop By Category</p>

      <div className="relative flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-0 bg-white rounded-full px-4 py-2 shadow-lg z-10 hover:bg-gray-200 transition duration-300"
        >
          ❮
        </button>

        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`w-full relative sm:w-1/2 md:w-1/4 flex-shrink-0 p-4 flex flex-col items-center`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-80 h-80 object-contain rounded-lg shadow-md"
                />
                <p className="text-center bg-blue-600 text-amber-50 mt-4 px-3 py-1 rounded-full text-sm absolute bottom-8 left-10">{product.name}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 bg-white rounded-full px-4 py-2 shadow-lg z-10 hover:bg-gray-200 transition duration-300"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;