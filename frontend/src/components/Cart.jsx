
import Footer from "./Footer";
import Button from "./Button";
import CartItemCard from "./CartItemCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  clearCart } from "../store/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cartItems.cartItems);

  const subtotal = items
  .filter(item => item.checked) // include only checked items
  .reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);

  const handleClearCartBtn = () => {
    dispatch(clearCart());
  };

  return (
    <div className=" bg-[#121212] text-white">
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

        {items.length === 0 ? (
          <div className="bg-[#1a1a1a] p-8 rounded-lg shadow text-center">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/">
              <Button className="bg-[#dd3a44] text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((p) => (
                <CartItemCard key={p._id} p={p} />
              ))}
            </div>

            <aside className="bg-[#1a1a1a] text-white rounded-lg shadow p-6 h-fit">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-white/50 mb-4">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <Button className="w-full bg-[#dd3a44] text-white mb-3">
                Proceed to Checkout
              </Button>
              <Button  className="w-full bg-gray-400 hover:bg-[#E85C64] hover:text-white text-black" variant="outline" onClick={handleClearCartBtn}>
                Clear Cart
              </Button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
