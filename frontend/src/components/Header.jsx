import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import Button from "./Button";
import { logout } from "../store/authSlice";

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutButton = () => {
    dispatch(logout());
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#efe6de] shadow-sm">
      <div className="container mx-auto px-2 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center space-x-2">
              {/* <div className="bg-blue-600 w-8 h-8 rounded-lg"></div> */}

              <span className="text-3xl  font-bold font-serif text-[#DD3A44] ">
                TechExchange
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-8 mx-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-[#DD3A44] font-medium"
            >
              Home
            </Link>
            <Link
              to="/sell"
              className="text-gray-600 hover:text-[#DD3A44]  font-medium"
            >
              Sell
            </Link>

            <Link
              to="/contact" 
              className="text-gray-600 hover:text-[#DD3A44]  font-medium"
            >
              Contact
            </Link>

            <Link
              to="/about"
              className="text-gray-600 hover:text-[#DD3A44]  font-medium"
            >
              About
            </Link>
            <Link
              to="/inbox"
              className="text-gray-600 hover:text-[#DD3A44]  font-medium"
            >
              Inbox
            </Link>
          </nav>
          <div className="hidden md:flex items-center  space-x-4">
            {!isLoggedIn ? (
              <>
                <Button
                  className="w-30 bg-[#DD3A44] hover:bg-[#E85C64] text-white "
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  className="w-30 bg-gray-400 hover:bg-[#E85C64] hover:text-white text-black"
                  onClick={() => navigate("/signup")}
                >
                  SignUp
                </Button>
              </>
            ) : (
              <div className="flex justify-center space-x-5 items-center">
                <div className="flex flex-col items-center">
                  <p>{cartItems.length}</p>
                  <Link to="/cart">
                    <ShoppingCart className="cursor-pointer" />
                  </Link>
                </div>
                <div className="rounded-full p-3 bg-[#DD3A44]">
                  <Link to="/profile">
                  <User className="cursor-pointer text-white w-6 h-6" />
                  </Link>
                </div>
                <Button
                  className="bg-[#DD3A44] text-white"
                  onClick={logoutButton}
                >
                  <User className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
          <Button
            className="md:hidden px-2 py-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="  h-5 w-5" />
            )}
          </Button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t mt-2 ">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-[#DD3A44]  font-medium"
              >
                Home
              </Link>

              <Link
                to="/sell" 
                className="text-gray-600 hover:text-[#DD3A44]  font-medium"
              >
                Sell
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-[#DD3A44]  font-medium"
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-[#DD3A44]  font-medium"
              >
                About
              </Link>
              <Link
                to="/inbox"
                className="text-gray-600 hover:text-[#DD3A44]  font-medium"
              >
                Inbox
              </Link>
            </div>
            <div className="">
                {isLoggedIn ? (
                  <div className="flex-1 mt-5">
                    <div className="flex space-x-2 mb-3">
                      <Link to="/profile" className="w-full"
                      >
                      <Button
                    className="w-full  bg-[#DD3A44] text-white hover:text-[#DD3A44]"
              
                  >
                    Profile
                  </Button>
                  </Link>
                  <Link to="/cart" className="w-full">
                  
                  <Button
                    className="w-full bg-[#DD3A44] text-white hover:text-[#DD3A44]"
                  >
                    Cart
                  </Button>
                  </Link>
                    </div>


                  <Button
                    className="w-full bg-[#DD3A44] text-white hover:text-[#DD3A44]"
                    onClick={logoutButton}
                  >
                    Logout
                  </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      className="flex-1  bg-[#DD3A44] text-white hover:text-[#DD3A44]"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      className="flex-1  bg-[#DD3A44] text-white hover:text-[#DD3A44]"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
