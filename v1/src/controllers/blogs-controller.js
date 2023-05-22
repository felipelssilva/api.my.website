const { validationResult } = require("express-validator");
const repository = require("../repositories/blogs-repository");
const { LOG } = require("../services/log");

exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load blogs!", e);
        res.status(500).send({ message: "Failed to load blogs!", error: e });
    }
};

exports.lastsPosts = async (req, res) => {
    try {
        const data = await repository.lastsPosts();
        res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load more post!", e);
        res.status(500).send({
            message: "Failed to load more post!",
            error: e,
        });
    }
};

exports.page = async (req, res) => {
    try {
        const data = await repository.page();
        res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load blogs!", e);
        res.status(500).send({ message: "Failed to load blogs!", error: e });
    }
};

exports.details = async (req, res) => {
    try {
        // let data = '';
        // data = await repository.details({
        //     id: req.params.id,
        //     permalink: req.params.id
        // });
        const data = await repository.details(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load the blog info!", e);
        res.status(500).send({
            error: e,
            message: "Failed to load the blog info!",
        });
    }
};

exports.saving = async (req, res) => {
    try {
        await repository.saving({
            id: req.params.id,
            title: req.body.title,
            permalink: this.permalink(req.body.title),
            content: req.body.content,
            short_content: req.body.short_content,
            updated_at: Date.now(),
        });
        res.status(200).send({
            message: `Blog (${req.body.title}) successfully updated!`,
        });
    } catch (e) {
        LOG("Failed to load the blog info!", e);
        res.status(500).send({
            message: `Failed to save the blogs info`,
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
        res.status(200).send({ message: `Blog successfully deleted!` });
    } catch (e) {
        LOG("Failed to delete the blog!", e);
        res.status(500).send({
            message: "Failed to delete the blog!",
            error: e,
        });
    }
};

exports.create = async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).send({ message: errors });
    }

    try {
        await repository.create({
            title: req.body.title,
            permalink: this.permalink(req.body.title),
            content: req.body.content,
            short_content: req.body.short_content,
            created_at: Date.now(),
        });
        return res
            .status(201)
            .send({ message: "Blogs successfully registered!" });
    } catch (e) {
        LOG("Failed to register blog.", e);
        return res
            .status(500)
            .send({ message: "Failed to register blog.", error: e });
    }
};

exports.permalink = (title) =>
    title
        .replace(/ /g, "-")
        .replace(/[^\w\s]/gi, "-")
        .toLowerCase();
