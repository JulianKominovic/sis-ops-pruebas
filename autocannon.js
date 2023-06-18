const autocannon = require("autocannon");
const responses = [];
const finishedBench = (err, res) => {
  const { throughput, duration } = res;
  const { average } = throughput;
  const listByPid = {};
  responses.forEach((response) => {
    const [pid, hostname] = response.split("-");

    if (!listByPid[hostname]) {
      listByPid[hostname] = {};
    }

    if (listByPid[hostname][pid]) {
      listByPid[hostname][pid] += 1;
    } else {
      listByPid[hostname][pid] = 1;
    }
  });
  console.log(listByPid);
  console.log(
    "Throughput:",
    Intl.NumberFormat("es", {
      maximumFractionDigits: 0,
    }).format(average / duration),
    "req/sec"
  );
};

autocannon(
  {
    url: "http://localhost:3000",
    amount: 20000,
    connections: 100,
    requests: [
      {
        method: "GET",
        path: "/",
        onResponse: (status, body, context) => {
          responses.push(body);
        },
      },
    ],
  },
  finishedBench
);
