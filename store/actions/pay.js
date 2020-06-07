export const PAY = "PAY";
import Rave from "../../models/rave";
import { key } from "../../.ENV/flutterwave";

export const pay = () => {
    console.log("Attempy")
    
      var rave = new Rave(key.public, key.secret);
      rave
        .initiatePayment({
          cardno: "5438898014560229",
          cvv: "890",
          expirymonth: "09",
          expiryyear: "19",
          currency: "NGN",
          pin: "3310",
          country: "NG",
          amount: "10",
          email: "desola.ade1@gmail.com",
          suggested_auth: "PIN",
          phonenumber: "0902620185",
          firstname: "temi",
          lastname: "desola",
          IP: "355426087298442",
          txRef: "MC-" + Date.now(),
          redirect_url: "https://rave-webhook.herokuapp.com/receivepayment",
          meta: [{ metaname: "flightID", metavalue: "123949494DC" }],
          device_fingerprint: "69e6b7f0b72037aa8428b70fbe03986c",
        })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

      return({
        type: PAY,
      })};
   