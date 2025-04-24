const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3005;
require("dotenv").config();

app.options("*", cors());

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const TOKEN = process.argv[2];

app.get(`${process.env.ENDPOINT}`, cors(), async (req, res) => {
  console.log("🕵️‍♂️ Proxying Request 🔄 : ", req.url);

  const config = {
    method: "get",
    url: `${process.env.SERVER_URL}${req.url}`,
    headers: {
      // Authorization: req.headers["authorization"],
      Authorization: `Bearer ${TOKEN}`,
      Origin: process.env.ORIGIN,
      Scope: "employee",
    },
  };

  axios(config)
    .then(async function (response) {
      console.log("✅ RESPONSE");
      await response;
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.log("IN ERROR", error);
      res.status(500).json({ error: error });
    });
});

app.get(`/download`, cors(), async (req, res) => {
  console.log("🕵️‍♂️ Proxying Download Request 🔄 : ", req.url);

  var config = {
    method: "get",
    url: `${process.env.SERVER_URL}${req.url}`,
    headers: {
      Authorization: req.headers["authorization"],
      Origin: process.env.ORIGIN,
      Scope: "user",
    },
  };

  axios(config)
    .then(async function (response) {
      console.log("✅ RESPONSE");
      await response;
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.log("IN ERROR", error);
      res.status(500).json({ error: error });
    });
});

app.listen(PORT, () => {
  console.log(`📊 Proxy Server is running on port ${PORT}`);
});
