const axios = require("axios");
const { response } = require("express");

const callSelectedService = async (httpMethod, url, data = {}) => {
    url = url["url"];

    const options = {
        method: httpMethod,
        url: url,
        data: { service: "SENEGAL-ORANGE-MONEY" },
        headers: { "Content-Type": "application/json" },
    };

    let response = await axios
        .request(options)
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch((err) => {
            return {
                status: "091",
                successful: false,
                reason: `something happened when calling child service on url: ${url} : ERROR \n ${JSON.stringify(err.response)}`,
            };
        });

    return response;
};

module.exports = { callSelectedService };
