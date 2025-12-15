
import Button from "./Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart, updateCartQty } from "../store/cartSlice";
import { checkedCartItems } from "../store/cartSlice";

function CartItemCard({ p }) {
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreseBtn = (id) => {
    dispatch(increaseQty(id));
  };

  const handleDecreseBtn = (id) => {
    dispatch(decreaseQty(id));
  };

  const toggleChecked = (id, checked) => {
    dispatch(checkedCartItems({ id, checked }));
  };

  return (
    
   
    <div
      className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
    >
      <input  onChange={(e) => toggleChecked(p._id, e.target.checked)}type="checkbox" className="w-6 h-6 accent-[#DD3A44] rounded  border border-gray-400" />
      
      <div className="w-28 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
        {p.img ? (
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Image
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">{p.brand || p.category}</div>
          </div>
          <div className="text-lg font-bold">₹{p.price}</div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => handleDecreseBtn(p._id)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <div className="px-3">{p.qty || 1}</div>
          <button
            onClick={() => handleIncreseBtn(p._id)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
          <button
            onClick={() => removeItem(p._id)}
            className="ml-4 text-sm text-red-600"
          >
            Remove
          </button>
          <Link className="ml-auto" to="/chat">
            <Button className="bg-[#DD3A44] text-sm text-white ">
              Chat with Seller
            </Button>
          </Link>
        </div>
      </div>
    </div>
   
  );
}

export default CartItemCard;
