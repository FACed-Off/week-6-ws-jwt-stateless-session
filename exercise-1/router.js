"use strict";

const { readFile } = require("fs");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const notFoundPage = '<p style="font-size: 10vh; text-align: center;">404!</p>';

const secret = "MEERANSHIVANI";
const payload = {
  name: "Shivani",
  user: true,
  admin: false,
};

module.exports = (req, res) => {
  switch (`${req.method} ${req.url}`) {
    case "GET /":
      return readFile("./index.html", (err, data) => {
        res.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": data.length,
        });
        return res.end(data);
      });
    case "POST /login":
      //const base64Decode = (str) => Buffer.from(str, "base64").toString();
      const cookie = jwt.sign(payload, secret);
      // var decode = jwt.decode(cookie, { complete: true });
      // console.log(decode.header);
      // console.log(decode.payload);
      // console.log(cookie);
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `data=${cookie}; HttpOnly;`,
      });
      return res.end();
    case "POST /logout":
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": "data=0; Max-Age=0",
      });
      return res.end();
    case "GET /auth_check":
      console.log("test");
      const message = "Failed!";
      const fail401 = () => {
        res.writeHead(401, {
          "Content-Type": "text/html",
          "Content-Length": message.length,
        });
        res.end(message);
      };

      if (!req.headers.cookie) return fail401();
    default:
      res.writeHead(404, {
        "Content-Type": "text/html",
        "Content-Length": notFoundPage.length,
      });
      return res.end(notFoundPage);
  }
};
