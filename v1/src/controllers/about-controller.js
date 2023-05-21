const repository = require("../repositories/about-repository");
const { LOG } = require("../services/log");

exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load admins!", e);
        res.status(500).send({ message: "Failed to load about me!", error: e });
    }
};

exports.details = async (req, res) => {
    try {
        const data = await repository.details(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        LOG("Failed to load admins!", e);
        res.status(500).send({
            error: e,
            message: "Failed to load the about me!",
        });
    }
};

exports.saving = async (req, res) => {
    try {
        await repository.saving({
            id: req.params.id,
            description: req.body.description,
            updated_at: Date.now(),
        });
        res.status(200).send({ message: `About me successfully updated!` });
    } catch (e) {
        LOG("Failed to load admins!", e);
        res.status(500).send({
            message: `Failed to save the about me!`,
            error: e,
        });
    }
};
