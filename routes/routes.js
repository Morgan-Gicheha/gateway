const express = require('express')
const router = express.Router()

const { selectService,generateURL } = require("../utils/serviceSelector")
const { callSelectedService } = require("../utils/serviceCaller")

router.post('/', async (req, res) => {
  let incomingService = req.body["service"]

  if (!incomingService || incomingService.length ===0 ) {
    return res.status(400).send({ status: "091", reason: "service feild must be present" })
  }

  let httpMethod = req.method
  let selectedService =selectService(incomingService)
  let generatedURL = generateURL(selectedService)
  let response= await callSelectedService(httpMethod,generatedURL,{name:"morgan"})

  res.send(response)
})


module.exports = router