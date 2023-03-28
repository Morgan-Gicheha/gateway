const express = require("express");
const router = require("./routes/routes");
const helmet = require("helmet");


const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

// todo: prevent same TRX within 5 minute prediod

const myOptions = {
    basePath: "logs",
    fileName: "gateway.log",
    ip: false,
    showOnConsole: false,
};

app.use(express.json());

require("express-file-logger")(app, myOptions);

app.use(helmet());
// app.use(preventSameAmountTrx);
app.use("/gateway",router);

app.all('*', function(req, res){
    res.status(404).send({status:"091", reason:`endpoint '${req.url}' was not found, 404`});
});


app.listen(port, () => {
    console.log(`GATEWAY: http://127.0.0.1:${port}`);
});
