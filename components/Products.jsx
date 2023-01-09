import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = ({ products, index }) => {
  const [shuffledProducts, setShuffledProducts] = useState(null);
  useEffect(() => {
    setShuffledProducts(products.sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap absolute top-[40vh] md:top-[45vh] lg:top-[60vh] w-full z-30 pb-8 ">
      {shuffledProducts?.slice(index[0], index[1]).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
