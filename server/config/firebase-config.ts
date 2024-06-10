const { initializeApp, cert } = require("firebase-admin/app");
import { getAuth } from "firebase-admin/auth";
import serviceAccountKey from "../config/serviceAccountKey.json";

const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const auth = getAuth(app);

export default auth;
