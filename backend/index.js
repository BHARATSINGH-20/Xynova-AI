const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => {
    const { message } = req.body;

    res.json({
        reply: `Backend response: ${message}`,
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});