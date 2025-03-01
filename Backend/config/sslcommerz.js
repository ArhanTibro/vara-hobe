import SSLCommerzPayment from 'sslcommerz-lts'; // ✅ Correct
import dotenv from "dotenv";

dotenv.config();

export const sslcommerz = new SSLCommerzPayment(
  process.env.SSLCOMMERZ_STORE_ID,
  process.env.SSLCOMMERZ_STORE_PASSWORD,
  false // Use 'true' for live mode
);
