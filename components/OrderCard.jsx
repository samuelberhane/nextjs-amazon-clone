import moment from "moment";
import Image from "next/legacy/image";

const OrderCard = ({ order }) => {
  const { amount, images, timestamp, amount_shipping } = order.data();
  return (
    <div className="mb-2 shadow bg-white">
      <div className="bg-[#f8f8f5] flex justify-between items-center py-3 px-2 text-sm md:text-[16px]">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="uppercase font-semibold">Order Placed</h1>
            <p className="font-light text-sm">
              {moment.unix(timestamp?.seconds).format("DD MMM YYYY")}
            </p>
          </div>
          <div>
            <h1 className="uppercase font-semibold">Total Price</h1>
            <p className="font-light text-sm">
              ${amount} - Fast Shipping Delivery ${amount_shipping}
            </p>
          </div>
        </div>
        <div>
          <h1 className="uppercase font-semibold">Total Items</h1>
          <p className="font-semibold text-lg text-blue-500">
            {images.length} Items
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center flex-wrap py-2 px-3">
        {images?.map((image, index) => (
          <div className="relative h-36 w-36" key={index}>
            <Image src={image} alt="itemImage" layout="fill" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
