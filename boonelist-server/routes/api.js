"use strict";

const express = require("express")

const router = new express.Router();

router.get("/", async function (req, res, next) {
    res.json({message: "Hello this is server"})
})

module.exports = router;