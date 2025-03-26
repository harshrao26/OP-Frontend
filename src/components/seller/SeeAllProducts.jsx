import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

function AllProducts() {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    brand: ''
  });

  useEffect(() => {
    if (!token) {
      setError('Please login as seller.');
      setLoading(false);
      return;
    }
    fetch('http://localhost:5001/api/seller/products/all', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/seller/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      alert('Error deleting product');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      brand: product.brand
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5001/api/seller/products/update/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        const { product: updatedProduct } = await res.json();
        setProducts(products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)));
        setEditingProduct(null);
      } else {
        alert('Failed to update product');
      }
    } catch (err) {
      alert('Error updating product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full border rounded px-2 py-1"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={editForm.stock}
                  onChange={handleEditChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={editForm.brand}
                  onChange={handleEditChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
