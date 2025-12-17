import { PaytmChecksum } from "../utils/paytmChecksum.js";

export const paytmPayment = async (req, res) => {
  try {
    const { amount, email } = req.body;

    if (!amount || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Amount & Email required" });
    }

    const ORDER_ID = "ORDER_" + Date.now();

    let params = {
      MID: process.env.PAYTM_MID,
      WEBSITE: "WEBSTAGING",
      CHANNEL_ID: "WEB",
      INDUSTRY_TYPE_ID: "Retail",
      ORDER_ID,
      CUST_ID: email,
      TXN_AMOUNT: amount.toString(),
      CALLBACK_URL: "http://localhost:5000/api/payment/paytm/callback",
    };

    // 🔥 Generate signature using PaytmChecksum
    const checksum = await PaytmChecksum.generateSignature(
      params,
      process.env.PAYTM_KEY
    );

    const paytmRequestParams = {
      ...params,
      CHECKSUMHASH: checksum,
    };

    res.json({
      success: true,
      message: "Paytm order initiated",
      order: paytmRequestParams,
    });

  } catch (err) {
    console.error("PayTM Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
