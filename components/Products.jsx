import { useEffect, useState } from "react";
import { Books, Movies } from "./";
import ProductCard from "./ProductCard";

const Products = ({ products, index }) => {
  const [shuffledProducts, setShuffledProducts] = useState(null);
  useEffect(() => {
    setShuffledProducts(products?.sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4 sm:gap-3 mx-4 md:mx-8 lg:mx-12">
      {shuffledProducts?.slice(index[0], index[1]).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
