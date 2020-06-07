
var options = {
    url: "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {
      "PBFPubKey": "FLWPUBK-7adb6177bd71dd43c2efa3f1229e3b7f-X",
      "client": "VodhvFFsni0CBeieHPq9HTuG5lbNPgmD5rbEw6Uxb0TD9eD9B3VM5uZ1B5lC3thQMbPypNBCAYxaW2W21VnGuznMPf1G1digW0sHjuO6BGLGbzkwv12rmgNelv19ECSaKfyJmWOSPBvQifHMXZz2M35WuZpE2oD78Be54Xz7vUy3b6MkxrFc+d5gTnuiluBcSDSmnpj/d1ovlo5bix3PeuMUtIYzGFE/RK/EcIYyfYnpL26VFT1aEn5d/iOPyHecqFYVhCMwzV0E6j0uBtT/DMWg+Bi4O1VHej2EBxxKcmwu9rTYvsFf81AtOKZazJEKOea9Xn7mx0J/QpcP2kEf3asWrUqNUgvacl8y8IyaS4jGtU7fCcrIreHttSekpT/16rc45sC428zQy6OfSLoJDA4D2Ww+TEYnMWRNhzuBDHJ9wJTfHmgQcipiD/r7cQyLAzyllfhXsHWFIv3R+ECgrrvxpYMe2lVQ5d+DdTO2pC1MyhkOscNBp7dUwoEGfU7nxY/UGoRWV5WSAg9nFYELS2F4gfvWVkbP07Q+ap11GYUbuZFTMmfULbK/3j//q+9eElWS+E2m6mY4upgehIat8qIGsvGLKR3kagL4wQPZlBMD/S8eiQ8sUD+ngFS8T0XfZUXC5m6IMQdZ7Bfz0mAT2w==",
      "alg": "3DES-24"
    },
    json: true,
  };

class Rave {
  /**
   * Rave object constructor
   * @param {*} public_key This is a string that can be found in merchant rave dashboard
   * @param {*} secret_key This is a string that can be found in merchant rave dashboard
   */
  constructor(public_key, secret_key) {
    this.public_key = public_key;
    this.secret_key = secret_key;
  }


  initiatePayment(card_details) {
    return new Promise((resolve, reject) => {
      let payment_options = Object.assign({}, options);
      payment_options.url =
        "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge";
      payment_options.body.client = card_details;
      payment_options.method = "POST";
      payment_options.body.PBFPubKey = this.public_key; // set public key

      request(payment_options)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default Rave;
