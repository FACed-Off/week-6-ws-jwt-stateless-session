"use strict";
var crypto = require("crypto");

module.exports = (secret) => {
  if (!secret || typeof secret !== "string") {
    throw Error("invalid secret!");
  }
  //HMAC: hashed-based message authenication code
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
