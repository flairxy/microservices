const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const events = [];
app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);

  axios
    .post("http://posts-clusterip-srv:4000/events", event)
    .catch((error) => console.log(error.data));
  axios
    .post("http://comments-srv:4001/events", event)
    .catch((error) => console.log(error.data));
  axios
    .post("http://query-srv:4002/events", event)
    .catch((error) => console.log(error.data));
  axios
    .post("http://moderation-srv:4003/events", event)
    .catch((error) => console.log(error.data));

  app.get("/events", (req, res) => {
    res.send(events);
  });

  res.send({
    status: "Ok",
  });
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
