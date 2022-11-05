const { validationResult } = require("express-validator");
const repository = require("../repositories/contacts-repository");
const { LOG } = require("../services/log");

// list
exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load contacts!", e);
        res.status(500).send({ message: "Failed to load contacts!", error: e });
    }
};

exports.details = async (req, res) => {
    try {
        const data = await repository.details(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load the contact info!", e);
        res.status(500).send({
            message: "Failed to load the contact info!",
            error: e,
        });
    }
};

// create
exports.create = async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).send({ message: errors });
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            date: Date.now(),
        });
        return res
            .status(201)
            .send({ message: "Contact successfully registered!" });
    } catch (e) {
        LOG("Failed to register contact.", e);
        return res
            .status(500)
            .send({ message: "Failed to register contact.", error: e });
    }
};
