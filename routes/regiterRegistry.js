const express = require("express");
const router = express.Router();
const services = require("../jsonServices/services.json");
const fs = require("fs");
const path = require("path");

const { notifyTelegram } = require("../utils/notification/notifyTelegram");

router.get("/", async (req, res) => {
    res.send(services);
});

router.post("/register", async (req, res) => {
    let data = req.body;

    if (data.hasOwnProperty("name") === false || data["name"].length == 0 || data.hasOwnProperty("port") === false || data["port"].length == 0) {
        return res.send({ status: "091", reason: "feild 'name' and 'port' must be present" });
    }

    // checking if service already exists
    if (services["services"][data["name"]]) {
        return res.status(400).send({ status: "091", reason: "feild 'name' already allocated" });
    }

    // checking if port is already allocated
    let portChecker = false;

    Object.keys(services.services).forEach((service) => {
        let singleService = services.services[service];

        if (singleService["port"] == data["port"]) {
            portChecker = true;
        }
    });

    if (portChecker) {
        return res.status(400).send({ status: "091", reason: "'port' already allocated" });
    }

    let jsonServices = services;
    jsonServices.services[data["name"]] = data;

    const filePath = path.join(__dirname, "../jsonServices/", "services.json");

    console.log(filePath);

    fs.writeFile(filePath, JSON.stringify(jsonServices), (err) => {
        if (err) throw err;
    });

    res.status(201).send({ ...req.body });
});

router.put("/register", async (req, res) => {
    res.send(":UPDATE REGISTERY SERVICE");
});

router.delete("/register", async (req, res) => {
    res.send(":DELETE REGISTERY SERVICE");
});

router.all("*", function (req, res) {
    res.status(404).send({ status: "091", reason: `endpoint '${req.baseUrl + req.url}' was not found, 404` });
});

module.exports = { router };
