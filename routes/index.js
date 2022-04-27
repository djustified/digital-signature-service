var express = require("express");
var router = express.Router();
const crypto = require("crypto");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

/**
 * generate key pair
 * http://localhost:3000/generate-key-pair
 */
router.get("/generate-key-pair", function (req, res, next) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "der",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "der",
    },
  });

  res.send({
    publicKey: publicKey.toString("base64"),
    privateKey: privateKey.toString("base64"),
  });
});

/**
 * sign the document
 * http://localhost:3000/sign
 */
router.post("/sign", (req, res) => {
  let { data, privateKey } = req.body;

  privateKey = crypto.createPrivateKey({
    key: Buffer.from(privateKey, "base64"),
    type: "pkcs8",
    format: "der",
  });

  const sign = crypto.createSign("sha256");
  sign.update(data);
  sign.end;
  const signature = sign.sign(privateKey).toString("base64");
  res.send({ data, signature });
});

/**
 * verify signature
 * http://localhost:3000/verify
 */

router.post("/verify", (req, res) => {
  let { data, publicKey, signature } = req.body;

  publicKey = crypto.createPublicKey({
    key: Buffer.from(publicKey, "base64"),
    type: "spki",
    format: "der",
  });

  const verify = crypto.createVerify("sha256");
  verify.update(data);
  verify.end();
  let result = verify.verify(publicKey, Buffer.from(signature, "base64"));

  res.send({ verify: result });
});

module.exports = router;
