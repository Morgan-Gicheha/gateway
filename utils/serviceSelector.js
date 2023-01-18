const services = require("../jsonServices/services.json");

const selectService = (service) => {
    let selectedService = null;

    try {
        selectedService = services["services"][service];
        return selectedService;
    } catch (error) {
        return { status: 091, successful: false, reason: "Service does not exist" };
    }
};

const generateURL = (selectedServiceObject) => {
    //  { port: "", host: "localhost", protocol: "http", route: "" };
    // http://127.0.0.1:3000
    let url;

    if (selectedServiceObject.port.length == 0) {
        url = `${selectedServiceObject.protocol}://${selectedServiceObject.host}${selectedServiceObject.route}`;
    } else {
        url = `${selectedServiceObject.protocol}://${selectedServiceObject.host}:${selectedServiceObject.port}${selectedServiceObject.route}`;
    }
    return {url:url};
};

module.exports = { selectService, generateURL };
