import { Books, Movies, Products } from ".";

const Feeds = ({ products, movies, books }) => {
  return (
    <div className="absolute top-[47vh] md:top-[45vh] lg:top-[60vh] w-full z-30 pb-8 px-4 md:px-8 lg:px-12">
      {/* Top Products */}
      <Products index={[0, 8]} products={products} />

      {/* Books */}
      <Books books={books} />

      {/* Bottom Products */}
      <Products index={[8, 12]} products={products} />

      {/* Movies */}
      <Movies movies={movies} />
    </div>
  );
};

export default Feeds;
