import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { CircleCheck, ArrowLeft, ArrowRight } from "lucide-react";

function ProductItemCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const userId = useSelector((state)=> state.auth.userData?._id)

  // ✅ derive state instead of storing it
  const productExistInCart = useMemo(
    () => cartItems.some((p) => p._id === product._id),
    [cartItems, product._id]
  );

  // message state
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false)

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAddToCart = () => {
    console.log(userId , product.sellerId)
    if(userId && userId === product.sellerId) {
      setShowAlert(true);
    }
    else{

      dispatch(addToCart(product));
      showMessage("Added to Cart");
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product._id));
    showMessage("Removed from Cart");
  };

  // image slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 mt-4 overflow-hidden">
      <div className="m-3 border-2 border-[#dd3a44] rounded-2xl">
        {/* Image */}
        <div className="pt-3 relative h-52 w-full overflow-hidden">
          <img
            src={
              product.images?.length
                ? product.images[currentIndex]
                : "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg"
            }
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />

          <ArrowLeft
            onClick={prevImage}
            className="absolute top-1/2 left-2 text-[#dd3a44] cursor-pointer"
          />
          <ArrowRight
            onClick={nextImage}
            className="absolute top-1/2 right-2 text-[#dd3a44] cursor-pointer"
          />
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xl font-bold">&#8377;{product.price}</p>

            {productExistInCart ? (
              <button
                onClick={handleRemoveFromCart}
                className="bg-[#dd3a44] hover:bg-[#E85C64] text-white px-4 py-2 rounded-xl"
              >
                Remove from cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-[#dd3a44] hover:bg-[#E85C64] text-white px-4 py-2 rounded-xl"
              >
                Add to cart
              </button>
            )}
          </div>

          {message && (
            <div className="flex justify-center mt-2 text-green-600">
              <CircleCheck className="mr-2" />
              {message}
            </div>
          )}
          {showAlert && (
            <div className="flex justify-center mt-2 text-red-600">
              <CircleCheck className="mr-2" />
              Your listed this product !
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItemCard;
