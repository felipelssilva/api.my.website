const express = require("express");

const router = express.Router();
// const { check } = require("express-validator");
const controller = require("../controllers/about-controller");
const { verifyJWT } = require("../auth");

router
    .get("/", controller.list)
    .get("/:id/edit", verifyJWT, controller.details)
    .put("/:id/save", verifyJWT, controller.saving);

module.exports = router;
