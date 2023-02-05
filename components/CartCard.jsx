import Image from "next/legacy/image";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  REMOVE_ITEM,
} from "../redux/slice/cartSlice";

const CartCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id, description, images, rating, price, title, amount } = product;
  const rate = Math.round(rating);

  return (
    <div className="flex gap-2 mb-2 shadow py-1 px-2">
      <div className="relative h-[80px] w-[80px]">
        <Image
          src={images[0]}
          alt="productImage"
          layout="fill"
          className="rounded"
        />
      </div>
      <div className="flex flex-col flex-grow md:flex-row">
        <div className="flex-grow">
          <h1>{title}</h1>
          <div className="flex items-center gap-2 text-sm">
            {Array(rate)
              .fill()
              .map((_, index) => (
                <AiFillStar key={index} className="text-yellow-500" />
              ))}
          </div>
          <p className="text-sm font-light">
            {description.length > 40
              ? description.slice(0, 37) + "..."
              : description}
          </p>
          <p className="my-[0.1rem] text-sm text-green-600">${price}</p>
        </div>
        <div className="flex md:flex-col gap-4 items-center">
          <div className="flex gap-2 items-center my-1">
            <p
              className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 cursor-pointer"
              onClick={() => dispatch(DECREASE_AMOUNT(id))}
            >
              -
            </p>
            <p>{amount}</p>
            <p
              className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 cursor-pointer"
              onClick={() => dispatch(INCREASE_AMOUNT(id))}
            >
              +
            </p>
          </div>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 whitespace-nowrap"
            onClick={() => dispatch(REMOVE_ITEM(id))}
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
