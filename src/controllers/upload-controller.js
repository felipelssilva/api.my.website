/* eslint-disable consistent-return */
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const processFile = require("../middleware/processFile-middleware");
const { LOG } = require("../services/log");

const storage = new Storage({
    credentials: {
        client_email: process.env.GCLOUD_STORAGE_API_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_STORAGE_API_PRIVATE_KEY,
    },
    projectId: process.env.GCLOUD_STORAGE_PROJECT_ID,
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const upload = async (req, res) => {
    try {
        await processFile(req, res);

        if (!req.file) {
            LOG(JSON.stringify({ message: "Please upload a file!" }));
            return res.status(400).send({ message: "Please upload a file!" });
        }

        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
            resumable: false,
            ifGenerationMatch: 2,
        });

        blobStream.on("error", (err) => {
            LOG(JSON.stringify({ message: err.message }));
            res.status(500).send({ message: err.message });
        });

        // eslint-disable-next-line no-unused-vars
        blobStream.on("finish", async (data) => {
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );

            try {
                await bucket.file(req.file.originalname).makePublic();
            } catch (err) {
                LOG(
                    JSON.stringify({
                        message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                        error: err,
                    })
                );

                return res.status(500).send({
                    message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                    url: publicUrl,
                    error: err,
                });
            }

            res.status(200).send({
                message: `Uploaded the file successfully: ${req.file.originalname}`,
                url: publicUrl,
            });
        });

        blobStream.end(req.file.buffer);
    } catch (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
            LOG(
                JSON.stringify({
                    message: "File size cannot be larger than 2MB!",
                })
            );
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        LOG(
            JSON.stringify({
                message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            })
        );
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const list = async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        const fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file.name,
                url: file.metadata.mediaLink,
            });
        });

        res.status(200).send(fileInfos);
    } catch (err) {
        LOG(err);

        res.status(500).send({
            message: "Unable to read list of files!",
        });
    }
};

const download = async (req, res) => {
    try {
        const [metaData] = await bucket.file(req.params.name).getMetadata();
        res.redirect(metaData.mediaLink);
    } catch (err) {
        res.status(500).send({
            message: `Could not download the file. ${err}`,
        });
    }
};

module.exports = {
    upload,
    list,
    download,
};
