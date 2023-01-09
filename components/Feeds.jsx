import { Books, Movies, Products, Footer } from ".";

const Feeds = ({ products, movies, books }) => {
  return (
    <div className="absolute top-[60vh] md:top-[55vh] lg:top-[65vh] w-full z-30">
      {/* Top Products */}
      <Products index={[0, 8]} products={products} />

      {/* Books */}
      <Books books={books} />

      {/* Bottom Products */}
      <Products index={[8, 12]} products={products} />

      {/* Movies */}
      <Movies movies={movies} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Feeds;
