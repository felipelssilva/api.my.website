/* eslint-disable no-unused-vars */
const httpProxy = require("http-proxy");
const debug = require("debug")("nodestr:server");
const http = require("http");
const app = require("./app");
const { LOG } = require("./services/log");

const server = http.createServer(app);

// PORT // based on express-generator
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

// error handler
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
        case "EACCES":
            LOG(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            LOG(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// listener handler
function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

// server
// httpProxy.createServer({
//   target:'http://localhost:3000'
// }).listen(4200);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
LOG(`API is alive on ${port}!`);
