import React from 'react';
import { Edit, Trash } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
      {product.images && product.images.length > 0 && (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{product.name}</h3>
        <p className="text-gray-700">
          <span className="font-semibold">Price:</span> ₹{product.price}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Stock:</span> {product.stock}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>
      </div>
      <div className="border-t px-4 py-2 flex justify-between">
        <button
          onClick={() => onEdit(product)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <Edit size={16} />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="flex items-center gap-1 text-red-600 hover:text-red-800"
        >
          <Trash size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
