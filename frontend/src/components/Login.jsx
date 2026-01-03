import React, { useState } from "react";
import Header from "./Header";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (data) => {
    try {
      const response = await fetch("https://tech-exchange-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json(); // parse response
      // console.log("Login response:", result);

      if (result.success) {
        dispatch(login({ authToken: result.authToken }));
        localStorage.setItem("auth-token", result.authToken);
        // console.log("saved in local storage from login " + result.authToken);
        navigate("/");
      } else {
        // handle error from backend
        console.error("❌ Login failed:", result.error);
        setError(result.message);
        reset({ password: "" }); // clear only password field
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setError("An unexpected error occurred. Please try again.");
      reset({ password: "" }); // clear only password field
    }
  };

  return (
    <div className="min-h-screen  bg-[#efe6de] ">
      {/* <Header /> */}
      <div className="flex justify-center items-center pt-20">
        {/* Box which is in middle of page */}
        <div className=" w-full max-w-md mx-3 ">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Heading box */}
            <div className="bg-[#dd3a44] p-8 text-center">
              <h1 className="text-2xl font-bold text-white">
                Login in your Account
              </h1>
            </div>

            {/* all inputs  */}
            <div>
              <form
                onSubmit={handleSubmit(loginUser)}
                className="p-8 space-y-6"
              >
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <Mail className="absolute left-3  h-auto w-5 top-10 text-gray-400" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    name="email"
                    className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
                    type="email"
                    placeholder="xyz@gmail.com"
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <Lock className="absolute left-3 h-auto w-5 top-10 text-gray-400 " />
                  {showPassword ? (
                    <Eye
                      onClick={() => setShowPassword(false)}
                      className="absolute right-3 h-auto w-5 top-10 text-gray-400 "
                    />
                  ) : (
                    <EyeOff
                      onClick={() => setShowPassword(true)}
                      className="absolute right-3 h-auto w-5 top-10 text-gray-400 "
                    />
                  )}
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    name="password"
                    className={
                      "pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password?.message}
                    </span>
                  )}
                  {error === "" ? (
                    <div></div>
                  ) : (
                    <div className="text-red-500">
                      Sorry login failed.Please try again.
                    </div>
                  )}
                </div>

                <button
                  className="w-full cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[#dd3a44] text-white hover:bg-[#E85C64] px-6 py-3 text-lg"
                  type="submit"
                >
                  Submit
                </button>
                <div className="flex justify-center items-center">
                  Don&apos;t have an account?&nbsp;
                  <span className="text-blue-600">
                    <Link to="/signup">Sign up</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
