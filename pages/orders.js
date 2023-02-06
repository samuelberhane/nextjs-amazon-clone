import { Header, OrderCard } from "../components";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";

const Orders = () => {
  const { data } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      onSnapshot(
        query(
          collection(db, "users", data?.user?.email, "orders"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setOrders(snapshot.docs)
      );
    }
    setLoading(false);
  }, [data]);

  if (loading) return;

  return (
    <div>
      <Header />
      {!data ? (
        <div className="flex justify-center mt-2">
          <button
            onClick={signIn}
            className="bg-yellow-400 hover:bg-yellow-500 py-2 px-4"
          >
            Sign in to see your orders.
          </button>
        </div>
      ) : (
        <>
          {orders?.length === 0 ? (
            <h1 className="px-3 md:px-6 lg:px-12 font-bold text-xl mt-2">
              Your Order Is Empty.
            </h1>
          ) : (
            <div className="px-3 md:px-12 lg:px-24 mt-2">
              <h1 className="font-semibold text-lg border-b-2 border-yellow-400 mb-1">
                Your Orders
              </h1>
              <p className="mb-3 font-semibold text-lg text-blue-500">
                {orders?.length} order
              </p>
              {orders?.map((order, index) => (
                <OrderCard key={index} id={order.id} order={order} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
