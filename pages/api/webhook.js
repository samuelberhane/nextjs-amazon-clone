import { buffer } from "micro";
let admin = require("firebase-admin");
let serviceAccount = require("../../firebase/permission.json");
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_SIGNIN_SECRET;
// import app from "../../firebase/config";

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const fulfilledOrder = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toLocaleString();
    const sign = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sign, endpointSecret);
    } catch (error) {
      console.log(error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fulfilledOrder(session)
        .then(() => {
          res.status(200);
        })
        .catch((error) =>
          res.status(400).send("Webhook error" + error.message)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
