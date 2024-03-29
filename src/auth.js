/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token)
        return res
            .status(401)
            .json({ auth: false, message: "No token provided." });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            res.setHeader("Set-Cookie", [`x-access-token=''`]);
            return res.status(500).json({
                auth: false,
                message: "Failed to authenticate token.",
            });
        }
        req.userId = decoded.id;
        next();
    });
};
