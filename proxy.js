var http = require('http'),
    httpProxy = require('http-proxy'),
    hmac = require('./hmac'),
    port = (process.env.PORT || 9000);

var hash = new hmac.create("I love food", 'abcdeg', 'sha1').hash();
var proxy = httpProxy.createProxy();

var proxyServer = http.createServer(function (req, res) {
    if (req.path === 'forbidden') {
        return res.end('nope');
    }

    req.headers["MCS_SERVICE"] = hash;
    proxy.web(req, res, {
        target: 'http://local.dev:4567'
    }, function (err) {
        console.log("Error: " + err);
    });
}).listen(port).on('error', function (e) {
    console.log("Error: " + e);
});
;
console.log("Sabeur PROXY  v1");
console.log(hash);
console.log('Listening on port ' + port);
