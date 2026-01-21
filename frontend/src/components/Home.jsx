import Header from "./Header";
import ProductItemCard from "./ProductItemCard";
import Footer from "./Footer";
import Button from "./Button";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import { MoveDown } from "lucide-react";

// import products from "./products";

function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)

  // updated hook
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/products/getproducts/${filter}?page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages)
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [filter, page]);

  const handleSelect = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="">
      <div className="flex justify-between lg:mx-25 my-5 mx-5">
        {/* Heading of the page */}
        <div className="text-white/80">
          <h1 className="text-3xl font-semibold">All Listed Products</h1>
          <p className="">To buy products go to cart and process from there!</p>
        </div>
        {/* filtering functionality */}
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

      {/* Product listing  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  lg:px-20 px-5 gap-6 sm:gap-2 mb-5">
        {products.map((product) => (
          <ProductItemCard key={product._id} product={product} />
        ))}
      </div>

      {/* pagination */}
      <div className="pagination w-full flex justify-center items-center text-white mt-15 ">
        {
          totalPages <= 0 ? (
            <div>There are no such products </div>
          )
          :
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
        }
      </div>
    </div>
  );
}

export default Home;
