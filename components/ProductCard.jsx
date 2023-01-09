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

  const ratingArray = [];
  for (let i = 0; i < rate; i++) {
    ratingArray.push(i);
  }

  return (
    <div className="bg-white px-4 py-4 shadow-md h-[465px] mb-2">
      <div className="relative h-[220px] w-full">
        <Image src={thumbnail} alt="product-image" layout="fill" />
      </div>
      <div className="max-w-full  h-[215px] flex flex-col justify-between">
        <div>
          <p className="font-bold lg:text-lg">{title.slice(0, 50)}</p>
          <div className="flex items-center gap-2">
            {ratingArray.map((rate, index) => (
              <AiFillStar key={index} className="text-yellow-500" />
            ))}
          </div>
          <p className="my-[0.15rem]">Brand: {brand}</p>
          <p className="text-sm">{description.slice(0, 90)}</p>
          <p className="my-[0.15rem] font-semibold text-green-600">${price}</p>
        </div>

        <button className="bg-yellow-500 py-2 w-full">Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
