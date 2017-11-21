const app = require("express")();
const crypto = require("crypto");

var secret_sha1 = function (mydata) {
    var secret_sha1 = crypto.createHash("sha1").update(mydata).digest("hex");
    return secret_sha1;
};

var token = "token";

app.listen(28889, function () {
    console.log("listening:28889端口")
});

app.get("/wechat/token", function (req, res) {
    console.log(111)
    var tokenarr = [];
    tokenarr[tokenarr.length] = token;
    tokenarr[tokenarr.length] = req.query.timestamp;
    tokenarr[tokenarr.length] = req.query.nonce;
    tokenarr.sort();
    var tokenStr = tokenarr.join("");
    var tokenSha1 = secret_sha1(tokenStr);
    console.log("signature:" + req.query.signature)
    console.log("tokenSha1:" + tokenSha1)
    if (req.query.signature == tokenSha1) {
        res.send(req.query.echostr);
    } else {
        return false;
    }
});