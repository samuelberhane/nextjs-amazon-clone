import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute bottom-0 h-[45vh] md:h-[60vh] lg:h-[70vh] w-full bg-gradient-to-t from-gray-500 to-transparent z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={6000}
        transitionTime={1000}
      >
        <div>
          <img
            loading="lazy"
            src="/img/banner1.jpg"
            alt="bannerImg"
            className="bannerImg"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="/img/banner2.jpg"
            alt="bannerImg"
            className="bannerImg"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="/img/banner3.jpg"
            alt="bannerImg"
            className="bannerImg"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="/img/banner4.jpg"
            alt="bannerImg"
            className="bannerImg"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="/img/banner5.jpg"
            alt="bannerImg"
            className="bannerImg"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="/img/banner6.jpg"
            alt="bannerImg"
            className="bannerImg"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
