import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function SellerProductCard({ product }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-product/${product._id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try{
      const token = localStorage.getItem("auth-token");
      const res = await fetch(`http://localhost:5000/api/products/delete/${product._id}`, {
        method: "DELETE",
        headers: { "auth-token": token },
      });
      const data = await res.json();  
      if(data.success){
        alert("Product deleted successfully");
        window.location.reload();
      }else{
        alert("Failed to delete product: " + (data.error || "Unknown error"));
      }
    }
    catch(error){
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-gray-900 truncate">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.category} • {product.brand}</p>
        <p className="text-sm font-bold text-gray-900">₹{product.price}</p>
      </div>


      {/* Edit Button */}
 <div className=" flex-[0.2] h-full flex flex-col items-center gap-2">
    <button
      onClick={handleEdit}
      className="absolute bottom-2 right-2 bg-[#dd3a44] hover:bg-[#E85C64] text-white px-3 py-1 rounded text-xs"
    >
      Edit
    </button>

    <button onClick={handleDelete} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100">
      <Trash2 size={20} className="text-gray-600 hover:text-red-600" />
    </button>
  </div>
      {/* delete button */}
    </div>
  );
}