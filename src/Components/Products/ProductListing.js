"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCardShimmer from "./ProductCardLoader";


function FilterPanel({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  priceRanges,
  onClose
}) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded border border-gray-300 dark:border-gray-700 filter">
      <h5 className="font-bold text-gray-900 dark:text-gray-100">Filters</h5>
      <hr className="hr-tag border-gray-300 dark:border-gray-700" />
      <div>
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full flex items-center justify-between text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 text-gray-900 dark:text-gray-100 category-button"
        >
          <h6 className="">Product</h6>
          <span className="text-lg">{isCategoryOpen ? "−" : "+"}</span>
        </button>
        {isCategoryOpen && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
  setSelectedCategory(cat);
  if (onClose) onClose(); 
}}

                className={`block text-left w-full px-2 py-1 rounded text-gray-900 dark:text-gray-100 ${
                  selectedCategory === cat
                    ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h6 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
          Price
        </h6>
        <select
          value={selectedPriceRange}
          onChange={(e) => {
            setSelectedPriceRange(e.target.value);
            if (onClose) onClose();
          }}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          {priceRanges.map((r) => (
            <option key={r} value={r} className="bg-white dark:bg-gray-700">
              {r === "All" ? "All prices" : r.replace("-", " - ")}
            </option>
          ))}
        </select>
      </div>

     
    </div>
  );
}



const ProductListing = () => {
  const [wishlist, setWishlist] = useState([]);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const priceRanges = ["All", "0-25", "25-50", "50-100", "100+"];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    let mounted = true;

    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        const mapped = data.map((item) => ({
          id: item.id,
          product_name: item.title,
          price: Math.round(item.price),
          discount_price: Math.round(item.price * 0.9),
          discount_percentage: 10,
          isVeg: item.id % 2 === 0,
          image: item.image,
          category: item.category,
        }));

        setProducts(mapped);
        setCategories([
          "All",
         "Favorite",
          ...Array.from(new Set(mapped.map((p) => p.category))),
        ]);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);
useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
  setWishlist(stored.map(Number)); 
}, []);

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);
const toggleWishlist = (product) => {
  const id = Number(product.id);

  setWishlist((prev) => {
    if (prev.includes(id)) {
      return prev.filter((pid) => pid !== id);
    } else {
      return [...prev, id];
    }
  });
};


const isInWishlist = (productId) => {
  return wishlist.includes(productId);
};





  const matchesPrice = (p) => {
    if (selectedPriceRange === "All") return true;
    const price = p.discount_price ?? p.price ?? 0;
    if (selectedPriceRange === "0-25") return price >= 0 && price <= 25;
    if (selectedPriceRange === "25-50") return price > 25 && price <= 50;
    if (selectedPriceRange === "50-100") return price > 50 && price <= 100;
    if (selectedPriceRange === "100+") return price > 100;
    return true;
  };

const filteredProducts = products.filter((p) => {
  const categoryMatch =
    selectedCategory === "All"
      ? true
      : selectedCategory === "Favorite"
      ? wishlist.includes(p.id)
      : p.category === selectedCategory;

  return categoryMatch && matchesPrice(p);
});


useEffect(() => {
  setCurrentPage(1);
}, [selectedCategory, wishlist]);



  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);


  const validCurrentPage =
    totalPages > 0 ? Math.min(Math.max(1, currentPage), totalPages) : 1;

  const startIndex = (validCurrentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    if (targetPage >= 1 && targetPage <= totalPages) {
      setCurrentPage(targetPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 lg:mt-24 min-h-screen bg-white dark:bg-gray-900">
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 dark:bg-black/60"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-800 p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-gray-900 dark:text-gray-100">
                Filters
              </h5>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Close
              </button>
            </div>
            <FilterPanel
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryChange}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={handlePriceRangeChange}
              priceRanges={priceRanges}
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* LEFT FILTER */}
        <aside className="hidden md:block md:w-72 lg:w-80">
          <FilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={handlePriceRangeChange}
            priceRanges={priceRanges}
          />
        </aside>

      
        <main className="w-full md:flex-1">
         
          <div className="flex items-center justify-between gap-3">
            <h1 className="category-heading text-gray-900 dark:text-gray-100">
              Product
            </h1>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden ml-auto flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Image
                src="/Assets/icons/menu.png"
                alt="Filter"
                width={18}
                height="18"
              />
              Filter
            </button>
          </div>

          {loading ? (
            <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardShimmer key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="py-6 text-center text-red-600 dark:text-red-400 bg-white dark:bg-transparent">
              {error}
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="w-full h-full">
                  <div className="product-card rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg dark:shadow-gray-900/50 dark:hover:shadow-gray-900 transition-shadow duration-200 h-full flex flex-col border border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/product/${product.id}`}
                      className="no-underline text-current flex flex-col h-full"
                    >
                      <div className="relative text-center p-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[200px] max-h-[200px]">
                        {/* Wishlist Icon */}
                        <button
                          className="absolute top-1 right-1 z-10 w-9 h-9 flex items-center justify-center
               rounded-full bg-white dark:bg-gray-800 shadow
               hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                        >
                          <Image
                            src={
                              isInWishlist(product.id)
                                ? "/Assets/icons/wishlist-filled.png"
                                : "/Assets/icons/wishlist.png"
                            }
                            alt="Wishlist"
                            width={30}
                            height={30}
                          />
                        </button>

                        <Image
                          src={product.image}
                          alt={product.product_name}
                          className="card-img-top object-contain w-full h-full"
                          width={150}
                          height={150}
                        />
                      </div>

                      <div className="flex flex-col grow p-4">
                        <h6 className="text-sm font-medium mb-2 line-clamp-2 min-h-10 text-gray-900 dark:text-gray-100">
                          {product.product_name}
                        </h6>

                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-bold text-base text-gray-900 dark:text-gray-100">
                            Rs. {product.discount_price}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 line-through text-sm">
                            Rs. {product.price}
                          </p>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-0 capitalize">
                          {product.category}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        
          {filteredProducts.length > 0 && totalPages > 0 && (
            <div className="d-flex justify-content-between align-items-center pagination bg-white dark:bg-transparent">
              <span className="text-muted text-gray-600 dark:text-gray-400">
                Page {validCurrentPage} of {totalPages}
              </span>

              <ul className="gap-2 flex align-items-center pagination-page">
                <li
                  className={`page-item ${
                    validCurrentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link border-0 text-gray-900  hover:text-gray-700 dark:hover:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(validCurrentPage - 1)}
                    disabled={validCurrentPage === 1}
                  >
                    ‹
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <li key={p} className="page-item">
                      <button
                        className={`page-link rounded-full w-9 h-9 ${
                          p === validCurrentPage
                            ? "bg-[#0a8f3c] text-white"
                            : "bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => handlePageChange(p)}
                      >
                        {p}
                      </button>
                    </li>
                  )
                )}

                <li
                  className={`page-item ${
                    validCurrentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link border-0 text-gray-900  hover:text-gray-700 dark:hover:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(validCurrentPage + 1)}
                    disabled={validCurrentPage === totalPages}
                  >
                    ›
                  </button>
                </li>
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
