/* eslint-disable no-unused-vars */
const debug = require("debug")("nodestr:server");
const http = require("http");
const app = require("./app");
const { LOG } = require("./services/log");

const server = http.createServer(app);

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
            throw LOG(error);
    }
}

function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

server.listen(port);
server.on("unhandledRejection", (reason, promise) => {
    LOG("Unhandled Rejection at:", promise, "reason:", reason);
    // Application specific logging, throwing an error, or other logic here
});
server.on("warning", (warning) => {
    LOG(warning.name); // Print the warning name
    LOG(warning.message); // Print the warning message
    LOG(warning.stack); // Print the stack trace
});
server.on("error", onError);
server.on("listening", onListening);
LOG(`API is alive on ${port}!`);
