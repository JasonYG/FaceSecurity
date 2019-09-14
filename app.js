const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send({ msg: "the server is working" }));

app.post("callback", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => console.log(`Listening to port ${port}!`));
