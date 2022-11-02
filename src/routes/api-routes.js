const express = require("express");
const { verifyJWT } = require("../auth");

const router = express.Router();
const controller = require("../controllers/upload-controller");

router
    .get("/", verifyJWT, (req, res) => {
        res.status(200).send({
            title: "API",
            version: "1.0.0",
        });
    })
    .post("/image/upload", verifyJWT, controller.upload)
    .get("/image/list", verifyJWT, controller.list)
    .get("/image/download/:name", verifyJWT, controller.download);

module.exports = router;
