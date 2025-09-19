import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Link to="/">
                <span className="text-xl font-bold text-white">
                  TechExchange
                </span>
              </Link>
            </div>
            <p className="mb-4">
              The trusted marketplace for buying and selling quality tech
              products.
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
                <Link to="/buy" className="hover:text-white">
                  Buy
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-white">
                  Sell
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
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/electronics" className="hover:text-white">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/computers" className="hover:text-white">
                  Computers
                </Link>
              </li>
              <li>
                <Link to="/audio" className="hover:text-white">
                  Audio
                </Link>
              </li>
              <li>
                <Link to="/wearables" className="hover:text-white">
                  Wearables
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
