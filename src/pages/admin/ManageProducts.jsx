import React, { useState, useEffect } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    type: "",
    price: "",
    stock: "",
    image_url: "",
    is_available: true,
  });

  //Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      // console.error("Error fetching products:", err);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const admin = JSON.parse(localStorage.getItem("user"));
        const token = admin?.token; 
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${editingProduct.product_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`},
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error("Failed to update product");
      } else {
        const admin = JSON.parse(localStorage.getItem("user"));
        const token = admin?.token; 
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`},
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error("Failed to create product");
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        category: "",
        type: "",
        price: "",
        stock: "",
        image_url: "",
        is_available: true,
      });
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Edit button handler
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  // Delete product
  const handleDelete = async (product_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const admin = JSON.parse(localStorage.getItem("user"));
        const token = admin?.token; 
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`},
        });
        
        if (!res.ok) throw new Error("Failed to delete product");
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  // Filter products by search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#9C27B0" }}>
          Manage Products
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingProduct(null);
            setFormData({
              name: "",
              description: "",
              category: "",
              type: "",
              price: "",
              stock: "",
              image_url: "",
              is_available: true,
            });
          }}
          className="text-white px-4 py-2 rounded-lg"
          style={{ backgroundColor: "#9C27B0" }}
        >
          {showForm ? "Close Form" : "+ Add Product"}
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, category, or description..."
          className="w-1/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9C27B0]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-purple-100"
        >
          <h3 className="text-xl font-semibold mb-4 text-center text-[#9C27B0]">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-purple-200 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Equipment, Product)"
              value={formData.category}
              onChange={handleChange}
              required
              className="border border-purple-200 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <input
              type="text"
              name="type"
              placeholder="Type (e.g. Rental, Purchase)"
              value={formData.type}
              onChange={handleChange}
              required
              className="border border-purple-200 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border border-purple-200 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={handleChange}
              required
              className="border border-purple-200 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
            <input
              type="text"
              name="image_url"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={handleChange}
              className="border border-purple-200 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#9C27B0]"
            />
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-purple-200 text-black rounded-lg px-3 py-2 w-full h-28 resize-none focus:ring-2 focus:ring-[#9C27B0]"
          />

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
            />
            <label className="text-black">Available</label>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#9C27B0] hover:bg-[#7B1FA2] text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      )}

      {/* Product Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto p-4 border border-purple-100">
        <table className="w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-black text-left border-b border-gray-300">
              <th className="p-3 border-r border-gray-300">ID</th>
              <th className="p-3 border-r border-gray-300">Name</th>
              <th className="p-3 border-r border-gray-300">Category</th>
              <th className="p-3 border-r border-gray-300">Type</th>
              <th className="p-3 border-r border-gray-300">Price</th>
              <th className="p-3 border-r border-gray-300">Stock</th>
              <th className="p-3 border-r border-gray-300">Available</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.product_id} className="border-t border-gray-300 hover:bg-gray-50 text-black transition">
                  <td className="p-3 border-r border-gray-300">{product.product_id}</td>
                  <td className="p-3 border-r border-gray-300">{product.name}</td>
                  <td className="p-3 border-r border-gray-300">{product.category}</td>
                  <td className="p-3 border-r border-gray-300">{product.type}</td>
                  <td className="p-3 border-r border-gray-300">${product.price}</td>
                  <td className="p-3 border-r border-gray-300">{product.stock}</td>
                  <td className="p-3 border-r border-gray-300">
                    {product.is_available ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.product_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500 italic">
                  No matching products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
