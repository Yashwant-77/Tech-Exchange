import { useNavigate } from "react-router-dom";
import { User, Menu, X, Star, Shield, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";
import CardContent from "./CardContent";
import Header from "./Header";
import Footer from "./Footer";

const benefits = [
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: "Verified Sellers",
    description: "All sellers are verified for trustworthiness",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-green-500" />,
    title: "Easy Returns",
    description: "30-day return policy for all purchases",
  },
  {
    icon: <Star className="h-8 w-8 text-yellow-500" />,
    title: "Quality Assured",
    description: "Every product is quality checked before shipping",
  },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">TechExchange</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              The trusted marketplace for second-hand electronics. Quality
              verified, securely delivered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="w-full" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button className="w-full" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose TechExchange?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make buying and selling tech products simple, secure, and
              sustainable
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
