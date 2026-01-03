import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";
import { Mail, User, MessageSquare } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // for now just simulate success — integrate with backend /api/contact if available
    console.log("contact form", form);
    setStatus("Your message was sent. We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#efe6de]">
      {/* <Header /> */}
      <div className="flex justify-center items-center pt-5 mb-5">
        <div className="w-full max-w-md mx-3">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-[#dd3a44] p-8 text-center">
              <h1 className="text-2xl font-bold text-white">Contact Us</h1>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-gray-600 text-center">
                Have a question or need help? Send us a message and we'll respond as soon as possible.
              </p>
              <form action="https://formsubmit.co/chouhanyashwant98@gmail.com" method="POST" className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name <span className="text-red-600">*</span>
                  </label>
                  <User className="absolute left-3 h-auto w-5 top-10 text-gray-400" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <Mail className="absolute left-3 h-auto w-5 top-10 text-gray-400" />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                    type="email"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <MessageSquare className="absolute left-3 h-auto w-5 top-10 text-gray-400" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-y"
                    placeholder="Describe your question or issue"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="w-full bg-[#dd3a44] hover:bg-[#E85C64] text-white px-6 py-3 text-lg" type="submit">
                    Send Message
                  </Button>
                  <Button
                    className="w-full bg-gray-400 hover:bg-[#E85C64] hover:text-white text-black px-6 py-3 text-lg"
                    variant="outline"
                    onClick={() => setForm({ name: "", email: "", message: "" })}
                  >
                    Reset
                  </Button>
                </div>

                {status && <div className="mt-4 text-green-600 font-medium">{status}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
