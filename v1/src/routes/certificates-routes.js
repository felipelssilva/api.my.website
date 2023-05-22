const express = require("express");

const router = express.Router();
const { check } = require("express-validator");
const controller = require("../controllers/certificates-controller");
const { verifyJWT } = require("../auth");

router
    .get("/", controller.page)
    .get("/:id", controller.details)
    .get("/:id/edit", verifyJWT, controller.details)
    .delete("/:id", verifyJWT, controller.delete)
    .put(
        "/:id/save",
        verifyJWT,
        [
            check("name")
                .isLength({ min: 4 })
                .withMessage(
                    "O Nome do certificado precisa ter pelo menos 4 letras"
                ),
            check("url")
                .isLength({ min: 4 })
                .withMessage(
                    "A URL do certificado precisa ter pelo menos 4 letras"
                ),
            check("description")
                .isLength({ min: 4 })
                .withMessage(
                    "O conteúdo do certificado precisa ter pelo menos 4 caracteres"
                ),
        ],
        controller.saving
    )
    .put(
        "/add",
        verifyJWT,
        [
            check("name")
                .isLength({ min: 4 })
                .withMessage(
                    "O Nome do certificado precisa ter pelo menos 4 letras"
                ),
            check("url")
                .isLength({ min: 4 })
                .withMessage(
                    "A URL do certificado precisa ter pelo menos 4 letras"
                ),
            check("description")
                .isLength({ min: 4 })
                .withMessage(
                    "O conteúdo do certificado precisa ter pelo menos 4 caracteres"
                ),
        ],
        controller.create
    );

module.exports = router;
