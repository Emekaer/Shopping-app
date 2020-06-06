const forge    = require('node-forge');
const request = require('request-promise-native');
const md5 = require('md5');

var options = {
    url: "",
    method: "",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: {
        "PBFPubKey": "",
        "alg": "3DES-24",
        client: "",
    },
    json: true
}

class Rave {
    /**
     * Rave object constructor
     * @param {*} public_key This is a string that can be found in merchant rave dashboard
     * @param {*} secret_key This is a string that can be found in merchant rave dashboard
     */
    constructor(public_key, secret_key){
        this.public_key = public_key;
        this.secret_key = secret_key;
    }

    encryptCardDetails(card_details) {
        card_details = JSON.stringify(card_details);
        let cipher   = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(this.getKey()));
        cipher.start({iv:''});
        cipher.update(forge.util.createBuffer(card_details, 'utf-8'));
        cipher.finish();
        let encrypted = cipher.output;
        return ( forge.util.encode64(encrypted.getBytes()) );
    }

    getKey() {
        let sec_key = this.secret_key;
        let keymd5 = md5(sec_key);
        let keymd5last12 = keymd5.substr(-12);

        let seckeyadjusted = sec_key.replace('FLWSECK-', '');
        let seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12);

        return seckeyadjustedfirst12 + keymd5last12;
    }

    initiatePayment(card_details) {
        return new Promise((resolve, reject) => {
            let encrypted_card_details = this.encryptCardDetails(card_details);
            let payment_options = Object.assign({}, options);
            payment_options.url = 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge';
            payment_options.body.client = encrypted_card_details;
            payment_options.method = 'POST';
            payment_options.body.PBFPubKey = this.public_key; // set public key

            request(payment_options)
                .then((result) => {
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
            })
    }
}

var rave = new Rave('FLWPUBK-ba0a57153f497c03bf34a9e296aa9439-X','FLWSECK-327b3874ca8e75640a1198a1b75c0b0b-X');
rave.initiatePayment({
    "cardno": "5438898014560229",
    "cvv": "890",
    "expirymonth": "09",
    "expiryyear": "19",
    "currency": "NGN",
    "pin": "3310",
    "country": "NG",
    "amount": "10",
    "email": "desola.ade1@gmail.com",
    "suggested_auth": "PIN",
    "phonenumber": "0902620185",
    "firstname": "temi",
    "lastname": "desola",
    "IP": "355426087298442",
    "txRef": "MC-" + Date.now(),
    "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
    "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
    "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
  }).then(result => console.log(result))
    .catch(error => console.log(error));