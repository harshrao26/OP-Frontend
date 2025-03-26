import React, { useState } from 'react';
import AddProduct from './AddProducts';
import SeeAllProducts from './SeeAllProducts';

const SellerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('addProduct');

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 text-zinc-500 bg-white p-4">
        <button
          className={`w-full py-2 mb-2 ${activeComponent === 'addProduct' ? 'bg-gray-300' : ''}`}
          onClick={() => setActiveComponent('addProduct')}
        >
          Add Product
        </button>
        <button
          className={`w-full py-2 ${activeComponent === 'seeAllProducts' ? 'bg-gray-300' : ''}`}
          onClick={() => setActiveComponent('seeAllProducts')}
        >
          See All Products
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        {activeComponent === 'addProduct' && <AddProduct />}
        {activeComponent === 'seeAllProducts' && <SeeAllProducts />}
      </div>
    </div>
  );
};

export default SellerDashboard;
