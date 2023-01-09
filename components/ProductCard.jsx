import Image from "next/image";
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
    <div className="bg-white px-5 py-4 shadow-md h-[470px]">
      <div className="relative h-56 w-[270px]">
        <Image src={thumbnail} alt="product-image" layout="fill" />
      </div>
      <div className="max-w-[270px]  h-[220px] flex flex-col justify-between">
        <div>
          <p>{title.slice(0, 50)}</p>
          <div className="flex items-center gap-2">
            {ratingArray.map((rate, index) => (
              <AiFillStar key={index} className="text-yellow-500" />
            ))}
          </div>
          <p>Brand: {brand}</p>
          <p className="text-sm">{description.slice(0, 90)}</p>
          <p>${price}</p>
        </div>

        <button className="bg-yellow-500 py-2 w-full">Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
