const express = require('express');
const router = express.Router();
const path = require('path')
const passport = require("passport");
const adminsController = require('../controllers/admins-controller');
const INDEX_VIEW_PATH = './src/views/index.ejs';

router
    .get('/', adminsController.isLoggedIn, (req, res, next) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'home' }
        )
    })
    .get("/contacts", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'contacts' }
        )
    })
    .get("/contacts/:id", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'contacts-details', id: req.params.id }
        )
    })
    .get("/blogs", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'blogs' }
        )
    })
    .get("/blogs/:id", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'blogs-details', id: req.params.id }
        )
    })
    .get("/blogs/:id/edit", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'blogs-edit', id: req.params.id }
        )
    })
    .get("/blog/add", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'blog-add' }
        )
    })
    .get("/certificates", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'certificates' }
        )
    })
    .get("/certificate/:id", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'certificates-details', id: req.params.id }
        )
    })
    .get("/certificate/:id/edit", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'certificates-edit', id: req.params.id }
        )
    })
    .get("/certificates/add", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'certificate-add' }
        )
    })
    .get("/projects", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'projects' }
        )
    })
    .get("/project/:id", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'projects-details', id: req.params.id }
        )
    })
    .get("/project/:id/edit", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'projects-edit', id: req.params.id }
        )
    })
    .get("/projects/add", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'projects-add' }
        )
    })
    .get("/configurations", adminsController.isLoggedIn, (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: req.user, page: 'configurations' }
        )
    })
    .get("/login", (req, res) => {
        res.render(
            path.resolve(INDEX_VIEW_PATH),
            { user: '', page: 'login' }
        )
    })
    .post("/login", function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                let data = {
                    message: info.message,
                    type: 'error'
                };
                return res.send(data)
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return adminsController.loggedinSuccess(req, res);
            });
        })(req, res, next)
    })
    .get("/logout",
        (req, res) => adminsController.logout(req, res));

module.exports = router;
