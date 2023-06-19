const express = require("express");
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello");
    console.log(req.data);
})


app.post("/EventData", (req, res) => {
    res.send(req.body);

    console.log(req.body);
})

app.listen(5000, () => {
    console.log("server started");
})