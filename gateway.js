const express = require('express')
const app = express()
const router = require("./routes/routes")
const helmet = require("helmet");


require('dotenv').config()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(helmet());

app.use("/gateway", router)

app.listen(port, () => {
    console.log(`GATEWAY: http://127.0.0.1:${port}`)
})