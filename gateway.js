const express = require("express");
const router = require("./routes/routes");
const { router: registyRouter } = require("./routes/regiterRegistry");

const helmet = require("helmet");

const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

// done: prevent same TRX within 3 minute prediod

// todo:  endpint register in the jsonServices/services.json file

// todo:   gateway to handle token based auth

// todo:    gateway to report fraudulent activities

// todo:    gateway to implement honey-pots for security

const logOptions = {
    basePath: "logs",
    fileName: "gateway.log",
    ip: false,
    showOnConsole: false,
};

app.use(express.json());

require("express-file-logger")(app, logOptions);

app.use(helmet());
app.use("/gateway", router);
app.use("/registry", registyRouter);

app.all("*", function (req, res) {
    res.status(404).send({ status: "091", reason: `endpoint '${req.url}' was not found, 404` });
});

app.listen(port, () => {
    console.log(`GATEWAY: http://127.0.0.1:${port}`);
});
