import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { CircleCheck } from "lucide-react";
function ProductItemCard({ product }) {
  const { img, name, price, description, date, id } = product;

  const dispatch = useDispatch();

  const [showMsg, setShowMsg] = useState(false);

  const handleOnClick = () => {
    dispatch(addToCart(product));
    setShowMsg(true);
  };

  return (
    <div className="w-full  bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mt-4 overflow-hidden">
      <div className="m-3 border-2 border-gray-400 rounded-b-2xl">
        {/* Image */}
        <div className="pt-3 relative h-52 w-full overflow-hidden">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {description}
            </p>
            <p className="text-sm">{date}</p>
          </div>

          {/* Price & Button */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900 mr-3">
              &#8377;{price}
            </p>

            <button
              onClick={handleOnClick}
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>

          {showMsg && (
            <div className="flex justify-center mt-2">
              <CircleCheck />
              <spa className="ms-2"> Added to Cart</spa>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItemCard;

// import React from "react";

// function ProductItemCard({ product }) {
//   const { img, name, price, brand, location, date, description } = product;
//   return (
//     <div className=" w-full   md:w-70 min-w-70  bg-white shadow-sm hover:shadow-2xl transition-shadow rounded-lg overflow-hidden  mt-4">
//       <div className="border-2 m-3">
//         <div className="h-48 w-full overflow-hidden">
//           <img
//             src={img}
//             alt="Shoes"
//             className="w-full h-full object-cover p-2 px-3 shadow-2xl"
//           />
//           <hr className="text-2xl font-bold" />
//         </div>

//         {/* Body */}
//         <div className="p-4">
//           <strong className="text-xl">{name}</strong>
//           <p className="text-gray-600 mb-4 font-medium">{description}</p>
//           <p className="text-2xl font-semibold">&#8377;{price}</p>

//           {/* Actions */}
//           <div className="flex justify-start mt-3">
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
//               Add to cart
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Image */}
//     </div>
//   );
// }
