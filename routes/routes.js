const express = require("express");
const router = express.Router();

const { selectService, generateURL, generateHealthURL } = require("../utils/serviceSelector");
const { callSelectedService } = require("../utils/serviceCaller");
const { notifyTelegram } = require("../utils/notification/notifyTelegram");

const { preventSameAmountTrx } = require("../middlewares/withdrawalCache/preventSameTRX");

router.post("/", preventSameAmountTrx, async (req, res) => {
    let incomingService = req.body["service"];

    if (!incomingService || incomingService.length === 0) {
        return res.status(400).send({
            status: "091",
            reason: "service feild must be present",
        });
    }

    let httpMethod = req.method;
    let selectedService = selectService(incomingService);

    if ("error" in selectedService && selectedService["error"] === true) {
        // console.log(":ERRORCHECK", selectedService)
        notifyTelegram({ response: selectedService, payload: req.body });
        return res.send(selectedService);
    }

    let generatedURL = generateURL(selectedService);
    let response = await callSelectedService(httpMethod, generatedURL, req.body);

    res.send(response);
});

router.get("/health", async (req, res) => {
    let serviceHeader = req.headers["service"];
    if (!serviceHeader || serviceHeader.length == 0) {
        //you can add a message quue to handle the task in the background.
        // you can also configure a notification service to send you notification when the worker is done getting the status of services
        return res.status(400).send({ successful: false, reason: "missing 'service:--' header, use 'service:ALL' to get a report of all available services " });
    }

    let selectedService = selectService(serviceHeader);
    if (selectedService["successful"] || selectedService["successful"] == false) {
        return res.status(400).send({ successful: false, reason: "service not defined" });
    }

    let healthURL = generateHealthURL(selectedService);

    let healthStatus = await callSelectedService("GET", healthURL);

    res.send(healthStatus);
});

router.all("*", function (req, res) {
    res.status(404).send({ status: "091", reason: `endpoint '${req.baseUrl + req.url}' was not found, 404` });
});

module.exports = router;
