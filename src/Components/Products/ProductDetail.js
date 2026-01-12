"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        // Map the API data to match our product structure
        const mappedProduct = {
          id: data.id,
          product_name: data.title,
          price: Math.round(data.price),
          discount_price: Math.round(data.price * 0.9),
          discount_percentage: 10,
          image: data.image,
          category: data.category,
          description: data.description,
        };

        setProduct(mappedProduct);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-10 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
          <p className="text-red-600 dark:text-red-400">
            {error || "Product not found"}
          </p>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 bg-white dark:bg-gray-900 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
        {/* LEFT COLUMN – PRODUCT IMAGE */}
        <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <Image
            src={product.image}
            alt={product.product_name}
            width={400}
            height={400}
            className="object-contain rounded-md"
          />
        </div>

        {/* RIGHT COLUMN – PRODUCT INFO */}
        <div className="space-y-4 ">
          {/* CATEGORY */}
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {product.category}
          </p>

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {product.product_name}
          </h1>

          {/* PRICE */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              Rs. {product.discount_price}
            </span>
            <span className="text-lg text-gray-400 dark:text-gray-500 line-through">
              Rs. {product.price}
            </span>
           
          </div>

          {/* DESCRIPTION */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
