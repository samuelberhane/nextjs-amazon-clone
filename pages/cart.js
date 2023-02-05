import Head from "next/head";
import Image from "next/legacy/image";
import { CartCard, Header } from "../components";
import { selectCartItems } from "../redux/slice/cartSlice";
import { useSelector } from "react-redux";

const cart = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <>
      <Head>
        <title>Cart - Amazon Clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        {cartItems.length === 0 ? (
          <>
            <div className="px-2 md:px-4">
              <div className="w-full bg-red-300 relative h-[380px] rounded-lg">
                <Image
                  src="/img/cartAd.jpg"
                  alt="cartAd"
                  layout="fill"
                  className="rounded-lg"
                />
              </div>
              <h1 className="mt-3 mb-2 font-bold text-lg px-1">
                Your Amazon Cart Is Empty.
              </h1>
            </div>
          </>
        ) : (
          <div className="flex flex-col md:flex-row mx-2 sm:px-4 md:mx-10 lg:mx-16 py-4 bg-[#f9f7f7] min-h-[calc(100vh-130px)]">
            <div className="flex-grow">
              <div className="w-full bg-red-300 relative h-[380px] rounded-lg">
                <Image
                  src="/img/cartAd.jpg"
                  alt="cartAd"
                  layout="fill"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h1 className="mt-3 mb-2 font-bold text-lg">
                  Your Amazon Cart
                </h1>
                <div>
                  {cartItems?.map((product, index) => (
                    <CartCard key={index} product={product} />
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-[250px] lg:w-[300px] border-l-4 border-gray-200">
              <h1 className="text-center">
                Subtotal(4 Items):{" "}
                <span className="font-bold text-lg">$76.98</span>
              </h1>
              <div className="flex justify-center mt-2">
                <button className="bg-gray-300 py-2 px-4">
                  Sign in to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default cart;
