const { validationResult } = require("express-validator");
const repository = require("../repositories/projects-repository");
const { LOG } = require("../services/log");

exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        return res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load projects");
        return res.status(500).send({ message: "Failed to load projects!" });
    }
};

exports.page = async (req, res) => {
    try {
        const data = await repository.page();
        return res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load page projects");
        return res.status(500).send({ message: "Failed to load projects!" });
    }
};

exports.details = async (req, res) => {
    try {
        const data = await repository.details(req.params.id);
        return res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load details projects");
        return res.status(500).send({
            error: true,
            message: "Failed to load the projects info!",
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
                released: req.body.released,
                updated_at: Date.now(),
            };
        } else {
            data = {
                id: req.params.id,
                name: req.body.name,
                url: req.body.url,
                description: req.body.description,
                released: req.body.released,
                updated_at: Date.now(),
            };
        }

        await repository.saving(data);

        return res.status(200).send({
            message: `Projects (${req.body.name}) successfully updated!`,
        });
    } catch (e) {
        LOG(`Failed to save the projects info!`, e);
        return res
            .status(500)
            .send({ message: `Failed to save the projects info!`, error: e });
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
            .send({ message: `Projects successfully deleted!` });
    } catch (e) {
        LOG("Failed to delete the Projects", e);
        return res
            .status(500)
            .send({ message: "Failed to delete the Projects!", error: e });
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
                released: req.body.released,
                created_at: Date.now(),
            };
        } else {
            data = {
                name: req.body.name,
                url: req.body.url,
                description: req.body.description,
                released: req.body.released,
                created_at: Date.now(),
            };
        }

        await repository.create(data);

        return res
            .status(201)
            .send({ message: "Project successfully registered!" });
    } catch (e) {
        LOG("Failed to register project.", e);
        return res
            .status(500)
            .send({ message: "Failed to register project.", error: e });
    }
};
