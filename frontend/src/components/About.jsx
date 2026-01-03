import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[#efe6de]">
      {/* <Header /> */}
      <div className="flex justify-center items-center pt-5 mb-5">
        <div className="w-full max-w-4xl mx-3">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-[#dd3a44] p-8 text-center">
              <h1 className="text-2xl font-bold text-white">About TechExchange</h1>
            </div>
            <div className="p-8">
              <p className="text-gray-700 mb-6 text-center">
                TechExchange is a community marketplace for buying and selling reliable second-hand electronics. We focus on quality verification, secure transactions and sustainable reuse.
              </p>

              <h2 className="text-xl font-semibold mb-2 text-[#DD3A44]">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                Reduce electronic waste by making it easy and safe to exchange used devices while giving sellers a fair price.
              </p>

              <h2 className="text-xl font-semibold mb-2 text-[#DD3A44]">What We Offer</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                <li>Verified sellers and quality checks</li>
                <li>Secure payments and buyer protection</li>
                <li>Easy returns and transparent listings</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-[#DD3A44]">Our Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 text-center bg-[#efe6de] rounded-lg">
                  <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-3" />
                  <div className="font-medium">Yashwant</div>
                  <div className="text-sm text-gray-500">Founder</div>
                </div>
                <div className="p-4 text-center bg-[#efe6de] rounded-lg">
                  <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-3" />
                  <div className="font-medium">Dev</div>
                  <div className="text-sm text-gray-500">Engineering</div>
                </div>
                <div className="p-4 text-center bg-[#efe6de] rounded-lg">
                  <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-3" />
                  <div className="font-medium">Support</div>
                  <div className="text-sm text-gray-500">Customer Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
