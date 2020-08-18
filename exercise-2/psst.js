"use strict";
var crypto = require("crypto");

module.exports = (secret) => {
  if (!secret || typeof secret !== "string") {
    throw Error("invalid secret!");
  }
  //HMAC: hashed-based message authenication code
  //generate HMAC sha256hash, which also takes in a secret which is a string
  //.update and .digest methods produce the hmac digest
  //.update(data[,inputEncoding]) - Updates the Hmac content with the given data, the encoding of which is given
  //    in inputEncoding.If encoding is not provided, and the data is a string, an encoding of
  //    'utf8' is enforced.
  //.digest([encoding])  - Calculates the HMAC digest of all of the data passed using hmac.update().
  //    If encoding is provided a string is returned; otherwise a Buffer is returned;
  const functions = {
    sign: (value) => {
      return crypto.createHmac("sha256", secret).update(value).digest("hex");
      // .replace(/\=+$/, "");
    },
    validate: (value, hash) => {
      //calculates the HMAC of the value
      const calculateHash = functions.sign(value);
      console.log(calculateHash);
      //compares it to the hash in provied in the parameters
      return calculateHash === hash;
    },
  };

  return functions;
};
