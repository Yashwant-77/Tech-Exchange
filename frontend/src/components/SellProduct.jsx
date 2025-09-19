import React, { useState } from "react";
import Header from "./Header";
import { IndianRupee, ShoppingBag, Tag, Award, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createUser = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: data.fullname,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await response.json();
      // console.log("after response.json" + result);

      if (result.success) {
        dispatch(login(result.authToken));
        localStorage.setItem("auth-token", result.authToken);
        // console.log("saved in local storage from signup " + result.authToken);
        navigate("/");
      } else {
        console.log("else part of data.success" + result.error);
        setError(result.error);
        reset();
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      reset();
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-100   ">
      <Header />
      <div className="flex justify-center items-center pt-5">
        {/* Box which is in middle of page */}
        <div className=" w-full max-w-md mx-3 ">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Heading box */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
              <h1 className="text-2xl font-bold text-white">
                Sell Your Product
              </h1>
            </div>

            {/* all inputs  */}
            <div>
              <form
                onSubmit={handleSubmit(createUser)}
                className="p-8 space-y-6"
              >
                <div className="relative">
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name
                  </label>
                  <ShoppingBag className="absolute left-3  h-auto w-5 top-10 text-gray-400" />

                  <input
                    {...register("productName", {
                      required: "This field is required",
                    })}
                    name="productName"
                    className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter name of your product"
                  />
                  {errors.productName && (
                    <span className="text-red-500">
                      {errors.productName?.message}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <IndianRupee className="absolute left-3  h-auto w-5 top-10 text-gray-400" />

                  <input
                    {...register("price", {
                      required: "This field is required",
                      pattern: {
                        value: /^\d+(\.\d+)?$/, // regex for integer or decimal
                        message: "Please enter a valid numeric value",
                      },
                    })}
                    name="price"
                    className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter price of the product"
                  />
                  {errors.price && (
                    <span className="text-red-500">
                      {errors.price?.message}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Brand
                  </label>
                  <Tag className="absolute left-3  h-auto w-5 top-10 text-gray-400" />
                  {/* <Star className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}
                  {/* <Award className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}

                  <input
                    {...register("brand", {
                      required: "This field is required",
                    })}
                    name="brand"
                    className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter the brand of your product"
                  />
                  {errors.brand && (
                    <span className="text-red-500">
                      {errors.brand?.message}
                    </span>
                  )}
                </div>

                <button
                  className="w-full cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                  type="submit"
                >
                  Publish for Sell
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
