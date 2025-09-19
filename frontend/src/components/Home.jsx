import React from "react";
import Header from "./Header";
import ProductItemCard from "./ProductItemCard";
import Footer from "./Footer";
import Button from "./Button";

function Home() {
  let products = [
    {
      id: 1,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 2,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 3,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 4,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 5,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 6,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 7,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 8,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 9,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 10,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 11,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 12,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 13,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 14,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 15,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },

    {
      id: 16,
      name: "Mobile",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguPq54fVlmq5XHTxw0Qov1_6CzSiSPPmtiw&s",
      price: 80000,
      brand: "iphone",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dignissimos?",
      location: "Mumbai",
      date: "23 Aug",
    },
  ];
  return (
    <div className="min-h-screen  bg-gray-200 ">
      <Header />
      <div className=" lg:mx-25 my-5 mx-5">
        <h1 className="text-3xl font-semibold">Result</h1>
        <p className="">To buy add products to cart and process from there!</p>
      </div>
      {/* Add some some functionality about filtering */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  lg:px-20 px-5 gap-6 sm:gap-2 mb-5">
        {products.map((product, index) => (
          <ProductItemCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center my-20">
        <Button>Load More</Button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
