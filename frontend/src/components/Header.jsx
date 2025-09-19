import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import Button from "./Button";
import { logout } from "../store/authSlice";

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const cartItems = useSelector((state) => state.cartItems.products);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutButton = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center space-x-2">
              {/* <div className="bg-blue-600 w-8 h-8 rounded-lg"></div> */}
              <span className="text-xl font-bold text-gray-900">
                TechExchange
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to={isLoggedIn ? "/buy" : "/"}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Buy
            </Link>
            <Link
              to={isLoggedIn ? "/sell" : "/"}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Sell
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              About
            </Link>
          </nav>
          <div className="hidden md:flex items-center  space-x-4">
            {!isLoggedIn ? (
              <>
                <Button className="w-30" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="w-30" onClick={() => navigate("/signup")}>
                  SignUp
                </Button>
              </>
            ) : (
              <div className="flex justify-center space-x-5 items-center">
                <div className="flex flex-col items-center">
                  <p>{cartItems.length}</p>
                  <ShoppingCart />
                </div>
                <div className="rounded-full p-3 bg-blue-600">
                  <User className="cursor-pointer text-white w-6 h-6" />
                </div>
                <Button onClick={logoutButton}>
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
          <div className="md:hidden py-4 border-t mt-2">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Home
              </Link>

              <Link
                to={isLoggedIn ? "/buy" : "/"}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Buy
              </Link>
              <Link
                to={isLoggedIn ? "/sell" : "/"}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Sell
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                About
              </Link>
              {/* start chatgpt code*/}

              {/* end  */}

              <div className="flex space-x-2 pt-2">
                {isLoggedIn ? (
                  <Button
                    className="flex-1"
                    onClick={() => navigate("/signup")}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      className="flex-1"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
