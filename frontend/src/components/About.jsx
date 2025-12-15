import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[#efe6de]">
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-4">About TechExchange</h1>
          <p className="text-gray-700 mb-6">
            TechExchange is a community marketplace for buying and selling
            reliable second-hand electronics. We focus on quality verification,
            secure transactions and sustainable reuse.
          </p>

          <h2 className="text-xl font-semibold mb-2">Our mission</h2>
          <p className="text-gray-600 mb-6">
            Reduce electronic waste by making it easy and safe to exchange used
            devices while giving sellers a fair price.
          </p>

          <h2 className="text-xl font-semibold mb-2">What we offer</h2>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Verified sellers and quality checks</li>
            <li>Secure payments and buyer protection</li>
            <li>Easy returns and transparent listings</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 text-center">
              <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-3" />
              <div className="font-medium">Yashwant</div>
              <div className="text-sm text-gray-500">Founder</div>
            </div>
            <div className="p-4 text-center">
              <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-3" />
              <div className="font-medium">Dev</div>
              <div className="text-sm text-gray-500">Engineering</div>
            </div>
            <div className="p-4 text-center">
              <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-3" />
              <div className="font-medium">Support</div>
              <div className="text-sm text-gray-500">Customer Success</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
