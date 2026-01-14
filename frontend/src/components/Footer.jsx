import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/80 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center  space-x-2 mb-4">
              <Link to="/">
                <span className="text-xl font-bold text-white">
                  TechExchange
                </span>
              </Link>
            </div>
            <p className="mb-4">
              "Where you old products finds new homes !"
            </p>
            <div className="flex space-x-4">
              <div className="bg-gray-800 p-2 rounded-full">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
              </div>
              <div className="bg-gray-800 p-2 rounded-full">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
              </div>
              <div className="bg-gray-800 p-2 rounded-full">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/sell" className="hover:text-white">
                  Sell
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>contact@techexchange.com</li>
              <li>+91-0000000000</li>
              <li>Indore, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© 2023 TechExchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
