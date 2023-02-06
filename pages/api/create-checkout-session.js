const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { cartItems, data } = req.body;

  const transformedItems = cartItems.map((item) => ({
    quantity: item.amount,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [...item.images],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 800, currency: "usd" },
          display_name: "Fast Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 3 },
          },
        },
      },
    ],
    metadata: {
      email: data.email,
      images: JSON.stringify(cartItems.map((item) => item.images[0])),
    },
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA", "ET"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_HOST}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/cart`,
  });
  res.status(200).json({ id: session.id });
};
