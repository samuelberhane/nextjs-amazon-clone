import Image from "next/legacy/image";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const {
    title,
    price,
    description,
    category,
    thumbnail,
    rating,
    discountPercentage,
    stock,
    brand,
  } = product;
  const rate = Math.round(rating);

  return (
    <div className="bg-white px-4 py-4 shadow-md h-[465px] mb-2">
      <div className="relative h-[220px] w-full">
        <Image src={thumbnail} alt="product-image" layout="fill" />
      </div>
      <div className="max-w-full  h-[215px] flex flex-col justify-between">
        <div>
          <p className="font-bold lg:text-lg">{title.slice(0, 50)}</p>
          <div className="flex items-center gap-2">
            {Array(rate)
              .fill()
              .map((_, index) => (
                <AiFillStar key={index} className="text-yellow-500" />
              ))}
          </div>
          <p className="my-[0.15rem]">Brand: {brand}</p>
          <p className="text-sm">{description.slice(0, 90)}</p>
          <p className="my-[0.15rem] font-semibold text-green-600">${price}</p>
        </div>

        <button className="bg-yellow-500 py-2 w-full hover:bg-yellow-600 focus:ring-yellow-500 outline-none focus:ring-2 focus:from-yellow-500">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
