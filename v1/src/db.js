const mongoose = require("mongoose");
const { LOG } = require("./services/log");

const connection = process.env.DATABASE_CONNECTION_STRING;

mongoose.connect(connection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("connected", () => {
    LOG("Mongoose default connection is open");
});

db.on("error", (err) => {
    LOG(`Mongoose default connection has occured \n${err}`);
});

db.on("disconnected", () => {
    LOG("Mongoose default connection is disconnected");
});

process.on("SIGINT", () => {
    db.close(() => {
        LOG(
            "Mongoose default connection is disconnected due to application termination"
        );
        process.exit(0);
    });
});
