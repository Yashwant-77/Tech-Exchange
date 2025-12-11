import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route , useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import LandingPage from "./components/LandingPage";
import SellProduct from "./components/SellProduct";

import Contact from "./components/Contact";
import Cart from "./components/Cart";
import ChatWithSeller from "./components/ChatWithSeller";
import Loading from "./components/Loading";
import { setCartItems ,  addToCart, removeFromCart, increaseQty, decreaseQty, updateCartQty, clearCart ,checkedCartItems  } from "./store/cartSlice";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const cartItems = useSelector((state) => state.cartItems.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation();


  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true;
    const checkAuthToken = async () =>{
      const token = localStorage.getItem("auth-token");
      if(!token){
        if(mounted){
          dispatch(logout());
          if(pathname !== "/")  navigate("/");
          setIsLoading(false);
        }
        return;
      }

      try {
        const response  = await fetch("http://localhost:5000/api/auth/getuser", {
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
        });

        const result = await response.json();

        if(response.ok && result.success){
          if(mounted) dispatch(login({ authToken: token , userData : result.user})); 
        }
        else{
           console.log("invalid token in App.jsx:", result);
          localStorage.removeItem("auth-token");
          if (mounted) {
            dispatch(logout());
            if (pathname !== "/") navigate("/");
          }
        }

        
      } catch (error) {
        console.log("error in App.jsx:", error);
        localStorage.removeItem("auth-token");
        if (mounted) {
          dispatch(logout());
          if (pathname !== "/") navigate("/");
        }
      }
      finally{
       if (mounted) setIsLoading(false);
      }



    }
    checkAuthToken();
    return ()=>{
      mounted = false;
    }
  }, []);



  useEffect(()=>{
    if(!isLoggedIn) return;

    const fetchCartItems = async () => {
      const token = localStorage.getItem("auth-token");
      try {
        const response = await fetch("http://localhost:5000/api/cart/updateCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            cartItems: cartItems,
          }),
        });
        const result = await response.json();
        if(result.success){
          console.log("Cart items synced successfully");
        }
        else{
          console.log("Failed to sync cart items:", result.error);  
        }
        
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    };

    fetchCartItems();

  },[cartItems]);






    if (isLoading) return <Loading/>
    

  return (
    <>
    
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={isLoggedIn ? <About /> : <Login/>} />
        <Route path="/sell" element={ isLoggedIn ? <SellProduct /> : <Login/>} />
        <Route path="/contact" element={isLoggedIn ? <Contact /> : <Login/>} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Login/>} />
        <Route path="/chat" element={isLoggedIn ? <ChatWithSeller /> : <Login/>} /> 
      </Routes>

    </>
  );
}

export default App;





