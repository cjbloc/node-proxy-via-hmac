var crypto = require('crypto');

function Hmac(text, key, algorithm) {
    this.text = text;
    this.key = key;
    this.algorithm = algorithm;
};
//
Hmac.prototype.hash = function () {
    hmac = crypto.createHmac(this.algorithm, this.key);
    hmac.write(this.text);
    hmac.end();
    return hmac.read();
}
module.exports = {
    create: Hmac
};
