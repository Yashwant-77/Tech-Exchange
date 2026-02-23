import Button from "./Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
  updateCartQty,
} from "../store/cartSlice";
import { checkedCartItems } from "../store/cartSlice";
import saveCartToDB from "../utils/saveCartToDB";

function CartItemCard({ p }) {
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
    saveCartToDB(cartItems)
  };

  const handleIncreseBtn = (id) => {
    dispatch(increaseQty(id));
    saveCartToDB(cartItems)
  };

  const handleDecreseBtn = (id) => {
    dispatch(decreaseQty(id));
    saveCartToDB(cartItems)
  };

  const toggleChecked = (id, checked) => {
    dispatch(checkedCartItems({ id, checked }));
    saveCartToDB(cartItems);
  };

  return (
    <div className="bg-[#1a1a1a]   text-white rounded-lg shadow p-4 ">
      {/* checkbox */}

      <div className="flex flex-col sm:flex-row">
        <div className="flex items-center gap-4">
          <input
            onChange={(e) => toggleChecked(p._id, e.target.checked)}
            type="checkbox"
            className="w-6 h-6   accent-[#DD3A44] rounded  border border-gray-400"
          />

          {/* image */}
          <div className="w-28 h-20 bg-[#1a1a1a]  text-white rounded overflow-hidden flex-shrink-0">
            <img
              src={
                p.images[0] ??
                "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg"
              }
              alt={p.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* product details */}
          <div className="flex-1">
            <div className="flex flex-col  justify-between items-start">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-white/80">
                  {p.brand || p.category}
                </div>
              </div>
              <div className="text-lg font-bold">₹{p.price}</div>
            </div>

            {/* increament decrement  buttons */}

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
            </div>
          </div>
        </div>

        {/* delete and chat button */}
        <div className=" w-full flex gap-2  items-baseline-last justify-end mt-5 ">
          <Button
            onClick={() => removeItem(p._id)}
            className="w-fit bg-[#DD3A44] text-white text-sm "
          >
            Remove
          </Button>

          <Link className=" " to={`/chat/product/${p._id}`}>
            <Button className="  bg-[#DD3A44] text-sm text-white ">Chat with Seller</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
