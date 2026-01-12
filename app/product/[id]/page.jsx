"use client";
import ProductDetail from "../../../src/Components/Products/ProductDetail";
import ThemeToggle from "../../../src/Components/ThemeToggle";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();

  return (
    <div>
      <ThemeToggle />
      <ProductDetail productId={params.id} />
    </div>
  );
}
