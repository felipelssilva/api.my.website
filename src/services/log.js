/* eslint-disable no-console */
exports.LOG = (message) => {
    const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        seconds: "2-digit",
    };
    const date = new Date(Date.now()).toLocaleDateString("pt-br", options);
    const spacer = "    ";

    console.log(date + spacer + message);
};
