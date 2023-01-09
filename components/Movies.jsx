import { Sells } from "./";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRef } from "react";

const Movies = ({ movies }) => {
  const scrollRef = useRef(null);

  // handle scroll
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "right"
          ? scrollLeft + clientWidth
          : scrollLeft - clientWidth;
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white px-5 py-4 shadow-md my-6">
      <h1 className="font-bold text-2xl">Top Sellers Movies</h1>
      <div className="relative h-64 ">
        <div className="h-full absolute left-0 z-40 flex items-center">
          <div
            className=" text-xl md:text-2xl lg:text-3xl bg-slate-300 hover:bg-slate-200  px-3 md:px:4 py-8 md:py-10"
            onClick={() => handleScroll("left")}
          >
            <AiOutlineLeft />
          </div>
        </div>
        <div className="h-full absolute right-0 z-40 flex items-center ">
          <div
            className=" text-xl md:text-2xl lg:text-3xl bg-slate-300 hover:bg-slate-200  px-3 md:px:4 py-8 md:py-10"
            onClick={() => handleScroll("right")}
          >
            <AiOutlineRight />
          </div>
        </div>
        <div
          className="flex items-center  overflow-x-scroll gap-3 scrollbar-hide hover:scrollbar-default"
          ref={scrollRef}
        >
          {movies?.map((movie, index) => (
            <Sells key={index} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
