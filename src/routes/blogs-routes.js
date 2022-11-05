const express = require("express");

const router = express.Router();
const { check } = require("express-validator");
const controller = require("../controllers/blogs-controller");
const { verifyJWT } = require("../auth");

// .get('/:permalink', controller.detailsByPermalink)

router
    .get("/", controller.page)
    .get("/lasts-posts", controller.lastsPosts)
    .get("/:id", controller.details)
    .get("/:id/edit", verifyJWT, controller.details)
    .delete("/:id", verifyJWT, controller.delete)
    .put(
        "/:id/save",
        verifyJWT,
        [
            check("title")
                .isLength({ min: 4 })
                .withMessage(
                    "O titulo do blog precisa ter pelo menos 4 letras"
                ),
            check("content")
                .isLength({ min: 20 })
                .withMessage(
                    "O conteúdo do blog precisa ter pelo menos 20 caracteres"
                ),
        ],
        controller.saving
    )
    .put(
        "/add",
        verifyJWT,
        [
            check("title")
                .isLength({ min: 4 })
                .withMessage(
                    "O titulo do blog precisa ter pelo menos 4 letras"
                ),
            check("content")
                .isLength({ min: 20 })
                .withMessage(
                    "O conteúdo do blog precisa ter pelo menos 20 caracteres"
                ),
        ],
        controller.create
    );

module.exports = router;
