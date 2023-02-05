import Image from "next/legacy/image";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ADD_ITEM } from "../redux/slice/cartSlice";

const ProductCard = ({ product }) => {
  const [itemAdded, setItemAdded] = useState(false);
  const dispatch = useDispatch();
  const { title, price, description, thumbnail, rating, brand } = product;
  const rate = Math.round(rating);

  // add item to cart
  const handleAddItem = () => {
    dispatch(ADD_ITEM({ ...product, amount: 1 }));
    setItemAdded(true);
  };

  return (
    <div className="px-4 py-3 shadow-md h-[450px] mb-2 bg-white">
      <div className="relative h-[200px] w-full">
        <Image src={thumbnail} alt="product-image" layout="fill" />
      </div>
      <div className="max-w-full flex flex-col justify-between h-[220px]">
        <div className=" flex-grow">
          <p className="font-bold lg:text-lg">{title.slice(0, 50)}</p>
          <div className="flex items-center gap-2">
            {Array(rate)
              .fill()
              .map((_, index) => (
                <AiFillStar key={index} className="text-yellow-500" />
              ))}
          </div>
          <p className="my-[0.15rem]">Brand: {brand}</p>
          <p className="text-sm">{description.slice(0, 70)}...</p>
          <p className=" font-semibold text-green-600">${price}</p>
        </div>
        <button
          disabled={itemAdded}
          onClick={handleAddItem}
          className="bg-yellow-500 py-2 w-full hover:bg-yellow-600 focus:ring-yellow-500 outline-none focus:ring-2 focus:from-yellow-500"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
