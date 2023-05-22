const express = require("express");

const router = express.Router();
const path = require("path");

const DEFAULT_PATH = `./public/index.html`;

router.get("/", (req, res) => {
    res.sendFile(path.resolve(DEFAULT_PATH));
});

module.exports = router;
