import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineCaretDown,
} from "react-icons/ai";

const Header = () => {
  return (
    <header>
      {/* Top Nav Content */}
      <div className="bg-[#10132c]  px-4 flex items-center justify-between">
        {/* Amazon Logo */}
        <div className="relative  h-14 w-24">
          <Image
            src="/img/amazon.png"
            alt="logo"
            layout="fill"
            className="cursor-pointer"
          />
        </div>

        {/* Search Bar */}
        <div className="bg-yellow-500 hidden sm:flex items-center rounded-md h-10 flex-grow hover:bg-yellow-600">
          <input
            type="text"
            className="h-full outline-none px-4 flex-grow rounded-l-md"
          />
          <BiSearchAlt2 className="text-2xl mx-2 cursor-pointer" />
        </div>

        {/* Links */}
        <div className="flex items-center space-x-2 text-white pl-3 whitespace-nowrap">
          <div className="link">
            <p className="text-[0.75rem] font-light md:text-[0.9rem]">
              Hello,Samuel Brhane
            </p>
            <h1 className="text-sm font-bold md:text-[0.9rem]">
              Account & Lists
            </h1>
          </div>
          <div className="link">
            <p className="text-[0.75rem] font-light md:text-[0.9rem]">
              Returns
            </p>
            <h1 className="text-sm font-bold md:text-[0.9rem]">& Orders</h1>
          </div>
          <div className="flex relative items-end  space-x-3 link">
            <AiOutlineShoppingCart className="text-4xl" />
            <p className="absolute left-[1rem] -top-2 bg-yellow-500 text-black rounded-full py-[0.15rem] px-[0.4rem] text-[0.8rem] font-bold">
              0
            </p>
            <p className="hidden md:inline text-md font-bold lg:text-lg">
              Cart
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Nav Content */}
      <div className="flex space-x-3 items-center whitespace-nowrap bg-gray-700 text-white px-4 py-2 text-sm">
        <div className="flex items-center space-x-1">
          <AiOutlineMenu />
          <p>All</p>
        </div>
        <p>SignIn</p>
        <p>Best Sellers</p>
        <p>Customer Service</p>
        <div className="flex items-center">
          <p>Prime</p>
          <AiOutlineCaretDown className="ml-[0.15rem] mt-1" />
        </div>
        <p className="hidden sm:inline">New Releases</p>
        <p className="hidden sm:inline">Today&#39;s Deals</p>
        <p className="hidden sm:inline">Books</p>
        <p className="hidden md:inline">Fashion</p>
        <p className="hidden md:inline">Kindle Books</p>
        <p className="hidden lg:inline">Toys & Games</p>
        <p className="hidden lg:inline">Gift Card</p>
        <p className="hidden lg:inline">Pharmacy</p>
        <p className="hidden xl:inline">Amazon Home</p>
        <p className="hidden xl:inline font-bold">Get ready for summer fun</p>
      </div>
    </header>
  );
};

export default Header;
