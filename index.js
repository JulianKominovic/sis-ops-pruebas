const express = require("express");
const os = require("os");
const port = 3000;
const cluster = require("cluster");
const totalCPUs = 80;

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.get("/", (req, res) => {
    console.log(
      `[NODO=${os.hostname()}] - Request received: ${req.method} ${req.url}`
    );
    res.send(
      `${process.pid}/${Math.random() > 0.5 ? "compute-0-0" : "compute-0-1"}`
    );
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
