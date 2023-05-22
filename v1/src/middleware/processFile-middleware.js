const util = require("util");
const Multer = require("multer");

const maxSize = 2 * 1024 * 1024;

const processFile = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: maxSize },
}).single("image");

const processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
