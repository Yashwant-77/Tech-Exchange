import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ProductItemCard from "./ProductItemCard";
import SellerProductCard from "./SellerProductCard";

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData); // Assuming authSlice has user data
  const isLoggedIn = useSelector((state) => state.auth.status);

  const [boughtProducts, setBoughtProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const [boughtRes, soldRes] = await Promise.all([
          fetch("http://localhost:5000/api/products/bought", {
            headers: { "auth-token": token },
          }),
          fetch("http://localhost:5000/api/products/sold", {
            headers: { "auth-token": token },
          }),
        ]);

        const boughtData = await boughtRes.json();
        const soldData = await soldRes.json();

        if (boughtData.success) setBoughtProducts(boughtData.products);
        if (soldData.success) setSoldProducts(soldData.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isLoggedIn, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#efe6de]">
        <div className="flex justify-center items-center h-96">
          <p>Loading profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        {/* User Info Section */}
        <div className="bg-[#1a1a1a] text-white/80 rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4 ">My Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <div>
              <label className="block text-sm font-medium ">
                Full Name
              </label>
              <p className="mt-1 text-lg">{user?.fullname || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium ">
                Email
              </label>
              <p className="mt-1 text-lg">{user?.email || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium ">
                Phone
              </label>
              <p className="mt-1 text-lg">{user?.phone || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium ">
                Location
              </label>
              <p className="mt-1 text-lg">{user?.location || "N/A"}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-4 bg-[#dd3a44] text-white px-4 py-2 rounded hover:bg-[#E85C64]"
          >
            Edit Profile
          </button>
        </div>

        {/* Sold Products Section */}
        <div className="mb-8">
          <h2 className="text-xl text-white/80 font-semibold mb-4">Products I've Sold</h2>
          {soldProducts.length === 0 ? (
            <div className="bg-[#1a1a1a] text-white/80 rounded-lg shadow p-6 text-center">
              <p className="">No products sold yet.</p>
              <button
                onClick={() => navigate("/sell")}
                className="mt-4 bg-[#dd3a44] text-white px-4 py-2 rounded hover:bg-[#E85C64]"
              >
                Sell a Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
              {soldProducts.map((product) => (
                <SellerProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Bought Products Section */}
        <div>
          <h2 className="text-xl text-white/80 font-semibold mb-4">Products I've Bought</h2>
          {boughtProducts.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-lg shadow p-6 text-center">
              <p className="text-white/80">No products bought yet.</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 bg-[#dd3a44] text-white px-4 py-2 rounded hover:bg-[#E85C64]"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {soldProducts.map((product) => (
                <SellerProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}