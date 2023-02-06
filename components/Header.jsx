import Image from "next/legacy/image";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineCaretDown,
} from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { GET_ITEMS, selectCartItems } from "../redux/slice/cartSlice";
import { useEffect } from "react";

const Header = () => {
  const { data } = useSession();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // get saved cart items from local storage
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedItems) dispatch(GET_ITEMS(savedItems));
    else dispatch(GET_ITEMS([]));
  }, []);

  return (
    <header>
      {/* Top Nav Content */}
      <div className="bg-[#0b0d1d] px-4 flex items-center justify-between py-1">
        {/* Amazon Logo */}
        <Link href="/" className="relative h-16 w-24 hover:border-2 ">
          <Image
            src="/img/amazon.png"
            alt="logo"
            layout="fill"
            className="cursor-pointer "
          />
        </Link>

        {/* Location */}
        <div className="gap-1 link items-center text-white mr-3 hidden md:flex">
          <GoLocation className="text-xl" />
          <div>
            <p className="text-[0.75rem] font-light md:text-[0.9rem]">
              Deliver to
            </p>
            <p className="text-sm font-bold md:text-[0.9rem]">Ethiopia</p>
          </div>
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
          <div className="link" onClick={data ? signOut : signIn}>
            <p className="text-[0.75rem] font-light md:text-[0.9rem]">
              Hello,{data ? data.user.name : "Sign in"}
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
          <Link
            href="/cart"
            className="flex relative items-end  space-x-3 link"
          >
            <AiOutlineShoppingCart className="text-4xl" />
            <p className="absolute left-[0.5rem] -top-3 bg-yellow-500 text-black rounded-full py-[0.15rem] px-[0.4rem] text-[0.8rem] font-bold">
              {cartItems.length}
            </p>
            <p className="hidden md:inline text-md font-bold lg:text-lg">
              Cart
            </p>
          </Link>
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
        <div className="sm:flex items-center hidden ">
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
        <p className="hidden xl:inline font-bold">Get ready for summer fun</p>
      </div>
    </header>
  );
};

export default Header;
