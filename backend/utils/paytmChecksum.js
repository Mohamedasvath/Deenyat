import crypto from "crypto";

export class PaytmChecksum {
  static generateSignature(params, key) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(params);
      crypto.generateKey(
        "hmac",
        {
          length: 256,
        },
        (err, keyBuffer) => {
          if (err) return reject(err);
        }
      );
      const signature = crypto
        .createHmac("sha256", key)
        .update(data)
        .digest("hex");
      resolve(signature);
    });
  }
}
