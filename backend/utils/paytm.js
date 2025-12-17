import PaytmChecksum from "../utils/paytm";
export const PaytmConfig = {
  MID: process.env.PAYTM_MID,
  KEY: process.env.PAYTM_KEY,
  WEBSITE: "WEBSTAGING",
  CHANNEL_ID: "WEB",
  INDUSTRY_TYPE_ID: "Retail",
  CALLBACK_URL: "http://localhost:5000/api/payment/paytm/callback",
};
