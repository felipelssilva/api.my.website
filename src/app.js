/* eslint-disable no-unused-vars */
const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const serverless = require("serverless-http");
const cors = require("cors");

const INDEX_VIEW_PATH = "./src/views/index.ejs";

require("dotenv").config();

const nomeApp = process.env.npm_package_name;
const env = process.env.NODE_ENV;

// Load models
const Contacts = require("./models/contacts");
const Admins = require("./models/admins");
const Blogs = require("./models/blogs");
const Abouts = require("./models/about");
const Certificates = require("./models/certificates");
const Projects = require("./models/projects");

// App
const app = express();

app.use(
    require("express-session")({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ limit: "2mb", extended: true }));
// app.set("view engine", "ejs");

app.use(cookieParser(process.env.SECRET));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.use((req, res, next) => {
    res.locals.message = req.flash();

    const allowedOrigins = [
        "www.felipeluis.com.br",
        "felipeluis.com.br",
        "localhost:3000",
        "localhost:4200",
    ];

    const origin = req.headers.host;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET");
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, content-type"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// Database
global.db = require("./db");

// Load routes
const apiRoutes = require("./routes/api-routes");
const contactsRoutes = require("./routes/contacts-routes");
const blogsRoutes = require("./routes/blogs-routes");
const aboutRoutes = require("./routes/about-routes");
const certificatesRoutes = require("./routes/certificates-routes");
const projectsRoutes = require("./routes/projects-routes");

app.use(express.static(`public`));

app.use("/api", apiRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/certificates", certificatesRoutes);
app.use("/api/projects", projectsRoutes);

module.exports = app;
module.exports.handler = serverless(app);
