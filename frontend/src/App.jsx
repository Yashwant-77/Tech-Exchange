import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import About from "./components/About";
import {  Routes, Route , useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import LandingPage from "./components/LandingPage";
import SellProduct from "./components/SellProduct";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import ChatWithSeller from "./components/ChatWithSeller";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Alert from "./components/Alert";
import EditProduct from "./components/EditProduct";
import Profile from "./components/Profile";
import { setCartItems } from "./store/cartSlice";
import Inbox from "./components/Inbox";
import colors from "./assests/colors.js";
import Footer from "./components/Footer.jsx";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
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
          dispatch(setCartItems(result.user.cartItems || [])); 
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





useEffect(() => {
  if (!isLoggedIn) return;

  const syncCart = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    try {
      await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ cartItems }),
      });
    } catch (err) {
      console.error("Cart sync failed", err);
    }
  };

  syncCart();
}, [cartItems]);








    if (isLoading) return <Loading/>
    

  return (
    <div className={`bg-[#121212]`}>
    <Header />
    <Alert/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={isLoggedIn ? <About /> : <Login/>} />
        <Route path="/sell" element={ isLoggedIn ? <SellProduct /> : <Login/>} />
        <Route path="/contact" element={isLoggedIn ? <Contact /> : <Login/>} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Login/>} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login/>} />
        <Route path="/edit-product/:id" element={isLoggedIn ? <EditProduct /> : <Login/>} />
        <Route path="/chat" element={isLoggedIn ? <ChatWithSeller /> : <Login/>} /> 
        <Route path="/inbox" element={isLoggedIn ? <Inbox /> : <Login/>} /> 
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;





