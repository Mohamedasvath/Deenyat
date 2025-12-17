import { PaytmChecksum } from "../utils/paytmChecksum.js";

export const paytmCallback = async (req, res) => {
  try {
    const receivedData = req.body;

    const checksum = receivedData.CHECKSUMHASH;
    delete receivedData.CHECKSUMHASH;

    const isValid = await PaytmChecksum.verifySignature(
      receivedData,
      process.env.PAYTM_KEY,
      checksum
    );

    if (!isValid) {
      return res.status(400).send("Checksum verification failed");
    }

    res.send("Payment Success");
  } catch (err) {
    res.status(500).send("Callback Error: " + err.message);
  }
};
