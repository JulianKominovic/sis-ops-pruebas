const express = require("express");
const os = require("os");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  console.log(
    `[NODO=${os.hostname()}] - Request received: ${req.method} ${req.url}`
  );
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
