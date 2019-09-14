const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const graphApi = require("./graph-api/main");

app.get("/", (req, res) => res.send({ msg: "the server is working" }));

app.post("/detect-img", (req, res) => {
  // Get img from request
  console.log(req.body);
  // Check the img with aws collection

  res.send({ encodedImages: graphApi() });
});

app.listen(port, () => console.log(`Listening to port ${port}!`));
