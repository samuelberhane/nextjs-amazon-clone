import { buffer } from "micro";
let admin = require("firebase-admin");
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_SIGNIN_SECRET;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        type: "service_account",
        project_id: "clone-ff05e",
        private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCp6Hj66DGubejr\nhGQLGTCuPuC2IhUILbjARxKfLLrPBudSJBinhDapVUHQh/pu+eSOZYzy8xSQsDHv\nT3Yx5U8QGPwcspofyj3G9OzVp9DjUV79rsGYocGzRaKv/CJlw2s7b3qgddDBiM1h\ngoEtlJDBabQF1V8BEMtsMb7P4wvyPhvUE3j5v23UVKChQV+svH91YxTjIbjnA6ne\nlysFrhVCkXlpEisTWdfaXLPKPqq5DMDSgir4Llp6hKgbhntuPgMd4kDKxQ7izuip\nQ/whk02DXjjkXDCcxX+MpPLvsI8EPv2p5M4iTOrkZuepfAC1w2hwCCVZhc29GJhq\nL7hSo/wxAgMBAAECggEACNzyR/m0yGnorIsgwjNzhqNhCsncWauI56l4HzWGHnvj\nCos3fgWM6b24y9f2swigvjeDPWkmDtDMygmrG2SK1fF3tUeGeAIPbEF6g+qtIC6D\ny1ftDA6OvCX1xphbHakuqXsMj9zqzC2xXlTLHZrnsi8sD4yB2DG4FXzC0gqrT4eN\naF1ZRGgIRRTsOZLE9FfSECAfeGxMkvct44ka3CF8117GD4HKdk7c9zAleV9drTMS\nzlLm/TbA1PrtD6yhl9ZlLdGFNvtvEb+f9duoMHhJMgf9kkV7YSEt4FyCGBbxMmPn\njUkH4GAWAosItdIArhls8JnPLnF1Y9kJw74XN8ggwQKBgQDeyYsImx+N2ic5KGCU\nXH4h88Es17yd9kQI5Bll6My0Q5CbKFE4AX9zJz+h1jmPtJdmEdQc3dKrbqFS9hbo\nUWbzGFyEURJlgSitdDxzfo2kUuEhXnzpJ9XNc7o5vW/lvwzG6LuJyyk6LDm9A7dF\nM44dit1lh7uPnUwvMuilvEsQpwKBgQDDPNj9ngcprbUYG+YYqL9Iiw3EqKqfMF4d\n+sQuJ+/iIUdZyfNStn8XKr5EwojFaKVHelyVe5NX5xBPKRpppG3Zyk/+IpXaUPks\na0X7jDjbIzht0YZk6jYPb5pD1bgtkEvUBQLwkNogWQv5ddcEL/qOcAs3A6oBa8ww\nvuBpNiWPZwKBgQCw8xk346WjUHM45cYX8ILKSsXS7SNFv3T4LtuxYr88KjHv2ozv\n09i7yJ+01ebwKfraOizkJJeQTBVcRFObgBQp3t6UxaO79WMuqZTeEtVDgASKMXc6\n5MXfIhz2gW0f6KeoUO+rmS6MotXVN99X2oP1GPeSDcW+YqxBDMlV4gEpHwKBgHja\nmZek0tpB5O/flTd+fanyKbuqjLOtxRTZvca0ghGAeCJkmHKC9XjpxI3bvb41YNo2\nLEl8DWFEbxwRXYA3gKhoS8wMrKZPqW6NmOx1iFxeGPgh0wd007IKa3vCOBg8UjQU\nRhWUFPIhLQBmqYq2CGtTgB217u6iQ+uIvHFkSyvRAoGAR2m7TLznGq/m3wUMzFb0\n0FWJzvIEhrmlCd5tYBrZdhmhNxcj/Bx0ekqxK8nGoodZWUMm8IlKaTSp6sMz7TEk\ncL7SaCdEfG6+jX7tQcsB3/saRO2fqqD0aX0r6YmbyRMrT2ZRltR5aYIU8GRFxj+T\nHE/Mg8zG77leSiv/II8cCZM=\n-----END PRIVATE KEY-----\n",
        client_email:
          "firebase-adminsdk-jtj9h@clone-ff05e.iam.gserviceaccount.com",
        client_id: "109418186848638495844",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jtj9h%40clone-ff05e.iam.gserviceaccount.com",
      }),
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
