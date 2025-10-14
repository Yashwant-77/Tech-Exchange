import { useEffect, useState } from "react";
import Navbar from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import LandingPage from "./components/LandingPage";
import SellProduct from "./components/SellProduct";

import Contact from "./components/Contact";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthToken = async () => {
      const localToken = localStorage.getItem("auth-token");

      try {
        if (localToken) {
          const response = await fetch(
            "http://localhost:5000/api/auth/getuser",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localToken,
              },
            }
          );

          // if (response.status === 401) {
          //   console.warn("Invalid token, logging out...");
          //   localStorage.removeItem("auth-token");
          //   dispatch(logout()); // you should have a logout action
          //   return;
          // }

          const result = await response.json();

          if (result.success) {
            dispatch(login(localToken));
          }
        }
      } catch (error) {
        console.log("error : " + error);
      }
    };
    checkAuthToken();
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
