import { useNavigate } from "react-router-dom";
import { User, Menu, X, Star, Shield, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Button from "./Button";
import Card from "./Card";
import CardContent from "./CardContent";
import Header from "./Header";
import Footer from "./Footer";


export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleGuestBtn = () => {
    dispatch(login({ userData: { name: "Guest User", isGuest: true } }));
    localStorage.setItem("auth-token", "guest-token");
    navigate("/");
  }

  return (
    <div className=" flex flex-col">

      {/* Hero Section */}
      <section className="py-16 md:py-24  bg-cover text-white/80   flex-1">
        <div className="container flex flex-col md:flex-row mx-auto px-4">

          <div className="flex-1 flex flex-col justify-center items-center">
             <h1 className="text-4xl md:text-6xl font-bold text-white/80 mb-6">
              <span className="text-[#DD3A44]">TechExchange</span>
            </h1>
            <p className="text-xl  mb-10 max-w-2xl ">
              "Where your old products find new homes !"
            </p>

            
            

          </div>
          <div className="flex-1 ms-5">

          <div className="flex flex-col  justify-center gap-4 ">
              <Button
                className="w-full bg-[#DD3A44] hover:bg-[#E85C64] text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="w-full bg-[#DD3A44] hover:bg-[#E85C64] text-white"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button
                className="w-full  bg-[#DD3A44] hover:bg-[#E85C64] text-white"
                onClick={handleGuestBtn}
              >
                Login as a guest
              </Button> 
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
     
    </div>
  );
}






