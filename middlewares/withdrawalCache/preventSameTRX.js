const redis = require("redis");
const { notifyTelegram } = require("../../utils/notification/notifyTelegram");

let redisClient;
const secondsToWait = 180;

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => {
        notifyTelegram({ error: "redis connection Failed", service: "API gateway", err: error });
    });

    await redisClient.connect();
})();

const preventSameAmountTrx = async (req, res, next) => {
    let phoneNumber = req.body.phoneNumber;
    let amount = req.body.amount;

    const cacheTransaction = await redisClient.get(phoneNumber);

    if (cacheTransaction) {
        let trx = JSON.parse(cacheTransaction);

        notifyTelegram({ status: "091", reason: `Similar transaction was initiated less than ${secondsToWait} seconds ago.`, extras: { incomingPayload: req.body, existingDataInSession: trx } });

        return res.send({ status: "091", reason: `Similar transaction was initiated less than ${secondsToWait} seconds ago.` });
    } else {
        // creating session
        await redisClient.set(phoneNumber, JSON.stringify(req.body), {
            EX: secondsToWait,
            NX: true,
        });
    }

    next();
};

module.exports = { preventSameAmountTrx };
