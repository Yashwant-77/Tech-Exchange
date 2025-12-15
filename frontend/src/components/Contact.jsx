import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";

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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-6">
            Have a question or need help? Send us a message and we'll respond as
            soon as possible.
          </p>

          <form action="https://formsubmit.co/chouhanyashwant98@gmail.com" method="POST"  className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2"
                placeholder="you@example.com"
                type="email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2 h-32 resize-y"
                placeholder="Describe your question or issue"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button  className="bg-[#dd3a44] text-white" type="submit">
                Send Message
              </Button>
              <Button
               className="w-30 bg-gray-400 hover:bg-[#E85C64] hover:text-white text-black"
                variant="outline"
                onClick={() => setForm({ name: "", email: "", message: "" })}
              >
                Reset
              </Button>
            </div>

            {status && <div className="mt-4 text-green-600">{status}</div>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
