import ProductListing from "../src/Components/Products/ProductListing";
import ThemeToggle from "../src/Components/ThemeToggle";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <ProductListing />
    </div>
  );
}
