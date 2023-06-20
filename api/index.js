const express = require("express");
const cors = require('cors');
const { Kafka } = require("kafkajs")


const app = express();
app.use(express.json());
app.use(cors());


var d = [];


const clientId = "blanav-bay_allocation"
const brokers = ["34.141.139.163:9093"]
const topic = "resource_allocation"

app.get("/", (req, res) => {
    res.send("Hello");
    console.log(req.data);
})


app.post("/EventData", (req, res) => {
    res.send(req.body);

    d = [{
        value: JSON.stringify(req.body.eventData),
    }];

    console.log(req.body.eventData);
})


const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

// we define an async function that writes a new message each second
const produce = async() => {
    await producer.connect()
    let i = 0

    // after the produce has connected, we start an interval timer
    setInterval(async() => {
        try {
            // send a message to the configured topic with
            // the key and value formed from the current value of `i`
            await producer.send({
                topic,
                messages: d,
            });

            // if the message is written successfully, log it and increment `i`
            console.log("writes: ", i);
            i++;
        } catch (err) {
            console.error("could not write message " + err)
        }
    }, 5000)
}

produce();

app.listen(5000, () => {
    console.log("server started");
})