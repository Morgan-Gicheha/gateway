let morgan = require("morgan");
let path = require("path");
let rfs = require("rotating-file-stream");



let accessLogStream = rfs.createStream("access.log", {
    interval: "3s", // rotate daily
    path: path.join(__dirname, "../log"),
});


module.exports = { accessLogStream };
