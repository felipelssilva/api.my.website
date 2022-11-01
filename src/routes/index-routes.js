const express = require("express");

const router = express.Router();
const path = require("path");

const DEFAULT_PATH = `./public/index.html`;

router
    .get("/", (req, res) => {
        res.sendFile(path.resolve(DEFAULT_PATH));
    })
    .get("/home", (req, res) => {
        res.sendFile(path.resolve(DEFAULT_PATH));
    })
    .get("/about-me", (req, res) => {
        res.sendFile(path.resolve(DEFAULT_PATH));
    })
    .get("/social-medias", (req, res) => {
        res.sendFile(path.resolve(DEFAULT_PATH));
    })
    .get("/my-projects", (req, res) => {
        res.sendFile(path.resolve(DEFAULT_PATH));
    })
    .get("/blog", (req, res) => {
        res.sendFile(path.resolve(DEFAULT_PATH));
    })
    .get("/blog/*", (req, res) => {
        res.sendFile(path.resolve(DEFAULT_PATH));
    })
    .get("/contact", (req, res) => {
        res.sendFile(path.resolve(DEFAULT_PATH));
    });

module.exports = router;
