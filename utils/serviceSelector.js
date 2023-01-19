const services = require("../jsonServices/services.json");

const selectService = (service) => {
    let selectedService = null;

    try {
        selectedService = services["services"][service];

        if (selectedService === undefined) {
            console.log({ status: "091", successful: false, reason: "missing configurations in regestry json file" });
            return { status: "091", successful: false, reason: "missing configurations in regestry json file or service is not configured in the registry" };
        }

        return selectedService;
    } catch (error) {
        return { status: 091, successful: false, reason: "Service does not exist" };
    }
};

const generateURL = (selectedServiceObject) => {
    //  { port: "", host: "localhost", protocol: "http", route: "" };
    // http://127.0.0.1:3000
    let url;

    if (selectedServiceObject.successful == false) {
        console.log("line 26");
        throw new Error("missing configurations in regestry json file");
    }

    if (selectedServiceObject.port.length == 0) {
        url = `${selectedServiceObject.protocol}://${selectedServiceObject.host}${selectedServiceObject.route}`;
    } else {
        url = `${selectedServiceObject.protocol}://${selectedServiceObject.host}:${selectedServiceObject.port}${selectedServiceObject.route}`;
    }
    return { url: url };
};

const generateHealthURL = (selectedServiceObject) => {
    //  { port: "", host: "localhost", protocol: "http", route: "" };
    // http://127.0.0.1:3000
    let url;


    if (selectedServiceObject.port.length == 0) {
        url = `${selectedServiceObject.protocol}://${selectedServiceObject.host}${selectedServiceObject.healthRoute || "/health"}`;
    } else {
        url = `${selectedServiceObject.protocol}://${selectedServiceObject.host}:${selectedServiceObject.port}${selectedServiceObject.healthRoute || "/health"}`;
    }
  
    return { url: url };
};
module.exports = { selectService, generateURL, generateHealthURL };
