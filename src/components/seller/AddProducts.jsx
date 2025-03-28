import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function AddProduct() {
  const token = localStorage.getItem('token');
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    brand: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!token) {
    return <div className="p-4">Please login as seller to add products.</div>;
  }

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    const uploadPromises = selectedFiles.map(file => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'online_planet');
      return fetch('https://api.cloudinary.com/v1_1/dnhak76jd/image/upload', {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then(fileData => fileData.secure_url)
        .catch(err => {
          console.error('Upload error:', err);
          return null;
        });
    });
    const urls = await Promise.all(uploadPromises);
    return urls.filter(url => url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    const descriptionHTML = stateToHTML(editorState.getCurrentContent());
    const imageUrls = await uploadFiles();
    const payload = {
      ...product,
      description: descriptionHTML,
      images: imageUrls,
      price: Number(product.price),
      stock: Number(product.stock)
    };

    try {
      const res = await fetch('https://op-backend-lgam.onrender.com/api/seller/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage('Product added successfully!');
        setProduct({ name: '', price: '', category: '', stock: '', brand: '' });
        setEditorState(EditorState.createEmpty());
        setSelectedFiles([]);
      } else {
        const data = await res.json();
        setMessage(data.message || 'Failed to add product');
      }
    } catch (error) {
      setMessage('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="loader"></div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Product fields */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" name="name" value={product.name} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="border rounded"
            editorClassName="p-2 min-h-[150px]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input type="number" name="price" value={product.price} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input type="text" name="category" value={product.category} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input type="number" name="stock" value={product.stock} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
  <label className="block text-gray-700">Brand</label>
  <select
    name="brand"
    value={product.brand}
    onChange={handleInputChange}
    className="w-full border rounded px-3 py-2"
    required
  >
    <option value="">Select a Brand</option>
    <option value="Nature Media">Nature Media</option>
    <option value="Dry Fruits">Dry Fruits</option>
    <option value="Cake">Cake</option>
    <option value="Electronics">Electronics</option>
    <option value="T-Shirts">T-Shirts</option>
    <option value="Medicines">Medicines</option>
    <option value="Home Essentials">Home Essentials</option>
    <option value="Furniture">Furniture</option>
    <option value="Bag">Bag</option>
  </select>
</div>

        {/* File upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="w-full" />
          {selectedFiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-4">
              {selectedFiles.map((file, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
      {/* Inline CSS for the loader */}
      <style>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AddProduct;
