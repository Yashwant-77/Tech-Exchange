
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
      className="bg-[#1a1a1a] text-white rounded-lg shadow p-4 flex items-center gap-4"
    >
      {/* checkbox */}
      <input  onChange={(e) => toggleChecked(p._id, e.target.checked)}type="checkbox" className="max-w-6 min-h-6   accent-[#DD3A44] rounded  border border-gray-400" />
      

      {/* image */}
      <div className="w-28 h-20 bg-[#1a1a1a] text-white rounded overflow-hidden flex-shrink-0">
          <img
            src={p.images[0] ?? "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg"}
            alt={p.name}
            className="w-full h-full object-cover"
          />
      </div>


      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-white/80">{p.brand || p.category}</div>
          </div>
          <div className="text-lg font-bold">₹{p.price}</div>
        </div>

        {/* buttons */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => handleDecreseBtn(p._id)}
            className="px-3 py-1 bg-[#DD3a44] rounded"
          >
            -
          </button>
          <div className="px-3">{p.qty || 1}</div>
          <button
            onClick={() => handleIncreseBtn(p._id)}
            className="px-3 py-1 bg-[#dd3a44] rounded"
          >
            +
          </button>
          <button
            onClick={() => removeItem(p._id)}
            className="ml-4 text-sm text-red-600"
          >
            Remove
          </button>
          <Link className="ml-auto" to={`/chat/product/${p._id}`}>
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
