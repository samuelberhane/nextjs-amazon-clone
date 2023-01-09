import { TopFooter, BottomFooter } from ".";

const Footer = () => {
  // Scroll to top
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="text-white w-full">
      {/* Back to Top */}
      <div
        className="bg-[#1e1744] py-2 w-full flex justify-center items-center cursor-pointer font-bold"
        onClick={scrollTop}
      >
        Back to Top
      </div>

      {/* Top Footer Content  */}
      <TopFooter />

      {/* Bottom Footer Content */}
      <BottomFooter />
    </div>
  );
};

export default Footer;
