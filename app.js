const express = require("express");

const app = express();
const port = process.env.port || 3000;

app.get("/api", (req, res) => res.send("the server is working"));

app.listen(port, () => console.log(`Listening to port ${port}!`));
