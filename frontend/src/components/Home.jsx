import React from "react";
import Header from "./Header";
import ProductItemCard from "./ProductItemCard";
import Footer from "./Footer";
import Button from "./Button";
import products from "./products";

function Home() {
  return (
    <div className="min-h-screen  bg-[#efe6de] ">
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
        <Button className="text-white bg-[#dd3a44]">Load More</Button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
