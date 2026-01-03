import { useState } from "react";
import { IndianRupee, ShoppingBag, FileText, Tag, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import Loading from "./Loading";
import Alert from "./Alert";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const sellProduct = async (productData) => {
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    if (!token) {
      dispatch(logout());
      navigate("/login");
      setLoading(false);
      return;
    }
    try {
      const imagesArray =
        typeof productData.images === "string"
          ? productData.images
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean) // removes empty strings
          : Array.isArray(productData.images)
          ? productData.images
          : [];

      const res = await fetch("http://localhost:5000/api/products/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          name: productData.productName,
          price: productData.price,
          category: productData.category,
          description: productData.description,
          brand: productData.brand,
          location: productData.location,
          images: imagesArray, // base64 or URL
        }),
      });

      const result = await res.json();

      if (result.success) {
        // Product added successfully
        console.log("Product added:", result.product);

        reset();
        alert("Product listed for sale successfully!");
        // optionally navigate to product page or home
        setLoading(false);
        navigate("/");
      } else {
        // Handle error from backend
        console.error("Error adding product:", result.error);
        // dispatch(showAlert({
        //   type: "error",
        //   message: result.error || "Failed to list product for sale.",
        //   duration: 3000,
        // }));
        alert(result.error || "Failed to list product for sale.");
        setLoading(false);
      }
    } catch (error) {
      console.log("server error in adding new product:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-[#efe6de]   ">
      {/* <Header /> */}
      <Alert />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center pt-5 ">
          {/* Box which is in middle of page */}
          <div className=" w-full max-w-md mx-3 ">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
              {/* Heading box */}
              <div className="bg-[#dd3a44] p-8 text-center">
                <h1 className="text-2xl font-bold text-white">
                  Sell Your Product
                </h1>
              </div>

              {/* all inputs  */}
              <div>
                <form
                  onSubmit={handleSubmit(sellProduct)}
                  className="p-8 space-y-6"
                >
                  <div className="relative">
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product Name <span className="text-red-600">*</span>
                    </label>
                    <ShoppingBag className="absolute left-3  h-auto w-5 top-10 text-gray-400" />

                    <input
                      {...register("productName", {
                        required: "This field is required",
                      })}
                      name="productName"
                      className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
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
                      Price <span className="text-red-600">*</span>
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
                      className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
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
                      Brand <span className="text-red-600">*</span>
                    </label>
                    <Tag className="absolute left-3  h-auto w-5 top-10 text-gray-400" />
                    {/* <Star className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}
                    {/* <Award className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}

                    <input
                      {...register("brand", {
                        required: "This field is required",
                      })}
                      name="brand"
                      className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
                      type="text"
                      placeholder="Enter the brand of your product"
                    />
                    {errors.brand && (
                      <span className="text-red-500">
                        {errors.brand?.message}
                      </span>
                    )}
                  </div>
                  {/* category */}
                  <div className="relative">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category <span className="text-red-600">*</span>
                    </label>
                    <Tag className="absolute left-3  h-auto w-5 top-10 text-gray-400" />
                    {/* <Star className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}
                    {/* <Award className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}

                    <select
                      {...register("category", {
                        required: "This field is required",
                      })}
                      name="category"
                      className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
                    >
                      <option value="laptop">Laptop</option>
                      <option value="computer">Computer</option>
                      <option value="mobile">Mobile</option>
                    </select>
                    {errors.category && (
                      <span className="text-red-500">
                        {errors.category?.message}
                      </span>
                    )}
                  </div>
                  {/* location */}
                  <div className="relative">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Location <span className="text-red-600">*</span>
                    </label>
                    <Tag className="absolute left-3  h-auto w-5 top-10 text-gray-400" />
                    {/* <Star className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}
                    {/* <Award className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}

                    <input
                      {...register("location", {
                        required: "This field is required",
                      })}
                      name="location"
                      className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
                      type="text"
                      placeholder="Enter the brand of your product"
                    />
                    {errors.location && (
                      <span className="text-red-500">
                        {errors.location?.message}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description <span className="text-red-600">*</span>
                    </label>
                    <FileText className="absolute left-3  h-auto w-5 top-10 text-gray-400" />
                    {/* <Star className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}
                    {/* <Award className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}

                    <input
                      {...register("description", {
                        required: "This field is required",
                      })}
                      name="description"
                      className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
                      type="text"
                      placeholder="Enter the brand of your product"
                    />
                    {errors.description && (
                      <span className="text-red-500">
                        {errors.description?.message}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="images"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Images <span className="text-red-600">*</span>
                    </label>
                    <Images className="absolute left-3  h-auto w-5 top-10 text-gray-400" />
                    {/* <Star className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}
                    {/* <Award className="absolute left-3  h-auto w-5 top-10 text-gray-400" /> */}

                    <input
                      {...register("images")}
                      name="images"
                      className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
                      type="text"
                      placeholder="Add some images URLs separated by commas"
                    />
                    {errors.images && (
                      <span className="text-red-500">
                        {errors.images?.message}
                      </span>
                    )}
                  </div>

                  <button
                    className="w-full cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[#dd3a44] text-white hover:bg-[#E85C64] px-6 py-3 text-lg"
                    type="submit"
                  >
                    Publish for Sell
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default SignUp;
