"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
    console.log(`Started on http://localhost:${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({message: "Hello this is server"})
})