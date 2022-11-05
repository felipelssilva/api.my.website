const { validationResult } = require("express-validator");
const repository = require("../repositories/certificates-repository");
const { LOG } = require("../services/log");

exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        return res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load certificates", e);
        return res
            .status(500)
            .send({ message: "Failed to load certificates!", error: e });
    }
};

exports.page = async (req, res) => {
    try {
        const data = await repository.page();
        return res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load page certificates", e);
        return res
            .status(500)
            .send({ message: "Failed to load certificates!", error: e });
    }
};

exports.details = async (req, res) => {
    try {
        const data = await repository.details(req.params.id);
        return res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load details certificates", e);
        return res.status(500).send({
            error: e,
            message: "Failed to load the certificates info!",
        });
    }
};

exports.saving = async (req, res) => {
    try {
        let data = {};

        if (req.body.img) {
            data = {
                id: req.params.id,
                name: req.body.name,
                url: req.body.url,
                description: req.body.description,
                img: req.body.img,
                order: req.body.order,
                updated_at: Date.now(),
            };
        } else {
            data = {
                id: req.params.id,
                name: req.body.name,
                url: req.body.url,
                description: req.body.description,
                order: req.body.order,
                updated_at: Date.now(),
            };
        }

        await repository.saving(data);

        return res.status(200).send({
            message: `Certificates (${req.body.name}) successfully updated!`,
        });
    } catch (e) {
        LOG(`Failed to save the certificates info!`, e);
        return res.status(500).send({
            message: `Failed to save the certificates info!`,
            error: e,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await repository.saving({
            id: req.params.id,
            updated_at: Date.now(),
            deleted_at: Date.now(),
        });
        return res
            .status(200)
            .send({ message: `Certificates successfully deleted!` });
    } catch (e) {
        LOG("Failed to delete the Certificates", e);
        return res
            .status(500)
            .send({ message: "Failed to delete the Certificates!", error: e });
    }
};

exports.create = async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).send({ message: errors });
    }

    try {
        let data = {};

        if (req.body.img) {
            data = {
                name: req.body.name,
                url: req.body.url,
                description: req.body.description,
                img: req.body.img,
                order: req.body.order,
                created_at: Date.now(),
            };
        } else {
            data = {
                name: req.body.name,
                url: req.body.url,
                description: req.body.description,
                order: req.body.order,
                created_at: Date.now(),
            };
        }

        await repository.create(data);

        return res
            .status(201)
            .send({ message: "Certificate successfully registered!" });
    } catch (e) {
        LOG("Failed to register certificate.", e);
        return res
            .status(500)
            .send({ message: "Failed to register certificate.", error: e });
    }
};
