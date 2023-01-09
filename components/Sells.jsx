import Image from "next/legacy/image";

const Sells = ({ book, movie }) => {
  return (
    <div className="relative h-64 min-w-[220px]">
      <Image
        src={
          book
            ? book?.image
            : `https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`
        }
        className="rounded-sm  md:rounded hover:scale-[1.02] md:hover:scale-105  transition duration-200"
        layout="fill"
        alt="img"
      />
    </div>
  );
};

export default Sells;
