import Header from "./Header";
import ProductItemCard from "./ProductItemCard";
import Footer from "./Footer";
import Button from "./Button";
import { useState, useEffect } from "react";
// import products from "./products";


function Home() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/getproducts/${filter}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, [filter]);


  const handleSelect = (e)=>{
    setFilter(e.target.value);
  }
 
  return (
    <div className="min-h-screen  bg-[#efe6de] ">
      {/* <Header /> */}
      
      <div className="flex justify-between lg:mx-25 my-5 mx-5">
        <div className=" ">
          <h1 className="text-3xl font-semibold">All Listed Products</h1>
          <p className="">
            To buy products go to cart and process from there!
          </p>
        </div>
        <div className="bg-[#DD3A44] text-white rounded-4xl px-5 align-center flex items-center">
          <select
            className="text-white px-5  py-2 outline-none border-none"
            name="category"
            id="category-select"
            value={filter}
            onChange={handleSelect}
          >
            <option className="text-black" value="all">
              All Products
            </option>
            <option className="text-black" value="laptop">
              Laptops
            </option>
            <option className="text-black" value="computer">
              PCs
            </option>
            <option className="text-black" value="mobile">
              Mobiles
            </option>
          </select>
        </div>
      </div>
      {/* Add some some functionality about filtering */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  lg:px-20 px-5 gap-6 sm:gap-2 mb-5">
        {products.map((product) => (
          <ProductItemCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center my-20">
        {/* <Button className="text-white bg-[#dd3a44] hover:bg-[#E85C64]">
          Load More
        </Button> */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
