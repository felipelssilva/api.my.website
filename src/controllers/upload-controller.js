/* eslint-disable consistent-return */
// const formidable = require("formidable");
// const { v4: uuidv4 } = require("uuid");

// const fs = require("fs");
// const multer = require("multer");

// const permalink = (title) =>
//     title
//         .replace(/ /g, "-")
//         .replace(/[^\w\s.]/gi, "-")
//         .toLowerCase();

// exports.multer = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, "/tmp/uploads");
//         },
//         filename: (req, file, cb) => {
//             const fileName = `${uuidv4()}-${permalink(file.originalname)}`;
//             return cb(null, fileName);
//         },
//     }),
//     limits: {
//         fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
//     },
// });

// exports.sendUpload = async (req, res, next) => {
//     if (!req.file) {
//         res.status(400).send("No file uploaded.");
//         return;
//     }

//     const storage = new Storage({
//         keyFilename: process.env.GCLOUD_STORAGE_API_KEY,
//         projectId: process.env.GCLOUD_STORAGE_PROJECT_ID,
//     });

//     const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

//     const generationMatchPrecondition = 0;

//     const options = {
//         destination: req.file.originalname,
//         preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
//     };

//     const blob = bucket.file(req.file.originalname, options);
//     // const form = formidable({ multiples: false });

//     fs.createReadStream(req.file.buffer)
//         .pipe(blob.createWriteStream())
//         .on("error", (error) => {
//             next(error);
//         })
//         .on("finish", () => {
//             const publicUrl = `https://storage.googleapis.com/${blob.name}/${blob.name}`;
//             res.status(200).send(publicUrl);
//         });

//     // await storage
//     //     .bucket(process.env.GCLOUD_STORAGE_BUCKET)
//     //     .upload(req.file.buffer, options);

//     // form.stringify(req, async (err, fields, file) => {
//     //     if (err) {
//     //         next(err);
//     //     }

//     //     // fs.createReadStream(file.image.filepath)
//     //     //     .pipe(blob.createWriteStream())
//     //     //     .on("error", (error) => {
//     //     //         next(error);
//     //     //     })
//     //     //     .on("finish", () => {
//     //     //         const publicUrl = `https://storage.googleapis.com/${blob.name}/${blob.name}`;
//     //     //         res.status(200).send(publicUrl);
//     //     //     });
//     // });

//     // const blobStream = blob.createWriteStream();

//     // blobStream.on("error", (err) => {
//     //     next(err);
//     // });

//     // blobStream.on("finish", () => {
//     //     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//     //     res.status(200).send(publicUrl);
//     // });

//     // blobStream.end(req.file.buffer);

//     // const form = formidable({ multiples: false });
//     // let fileToUpload = "";

//     // const generationMatchPrecondition = 0;

//     // const options = {
//     //     destination: fileToUpload.filepath,
//     //     preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
//     // };

//     // form.stringify(req, async (err, fields, file) => {
//     //     if (err) {
//     //         next(err);
//     //         return;
//     //     }

//     //     fileToUpload = file;

//     //     await storage
//     //         .bucket(bucket)
//     //         .upload(fileToUpload.image.filepath, options);
//     //     // .then((response) => response.json())
//     //     // .then((response) => console.log(response))
//     //     // res.status(200).send({
//     //     //     message: `Upload realizado com sucesso - ${fileToUpload.originalFilename} uploaded to ${bucketName}`,
//     //     //     image_url: `https://storage.cloud.google.com/${bucketName}/${fileToUpload.originalFilename}`,
//     //     // })
//     //     // .catch(res.status(401).send({ message: `Upload não realizado` }));

//     //     // .then(
//     //     //     res.status(200).send({
//     //     //         message: `Upload realizado com sucesso - ${fileToUpload.originalFilename} uploaded to ${bucketName}`,
//     //     //         image_url: `https://storage.cloud.google.com/${bucketName}/${fileToUpload.originalFilename}`,
//     //     //     })
//     //     // )
//     //     // .catch(res.status(404).send({ message: `Upload não realizado` }));
//     // });

//     // res.status(200).send({
//     //     message: `Upload realizado com sucesso - ${filePath} uploaded to ${bucketName}`,
//     //     image_url: `/assets/img/uploads/${filename}`,
//     // });

//     //     .catch(
//     //     res.status(406).send({
//     //         message: `Upload não realizado`,
//     //     })
//     // );
// };

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

// storage.getBuckets().then((x) => console.log(x));

const formatting = (title) => {
    const date = new Date().getTime();

    return `${date}__${title
        .replace(/ /g, "-")
        .replace(/[^\w\s.]/gi, "-")
        .toLowerCase()}`;
};

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
