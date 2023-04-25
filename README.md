
## NOTE:
 There is an issue with this project. It is not payments ready in the following areas
- it is quite difficult to handle callbacks of  individual services.
- for payment that are not 'one http call', it will result to redunduncy as you have to register evey call in the registry. some payments, you have         to create an payment intent, then make another for payment completion.
    
I am creating another  project [Payment-Gateway-v2](https://github.com/Morgan-Gicheha/Payment-Gateway-v2) to address all these issues .

#### DOC

every microservice should expose a `/health`  endpoint.
This endpoint should do a simulation of all dependancies that might block
requests from going through.
e.g -  the endpoints should connect to the db and do a read to test the connection

 
 
## Tech

Dillinger uses a number of open source projects to work properly:

- All services should be registered in the `jsonServices/services.json` file - done
- gateway to handle rate limiting and service attacks - done with helmet js
- gateway to handle token based auth - not done
- gateway to handle logging - done
- gateway to report fraudulent activities - not done
- gateway to implement honey-pots for security - not done
- cache on the gateway level to prevent users from withdrawing the same amount within a certain period of time (maybe 5 min) - done



## ....

Check this repo instead  [Payment-Gateway-v2](https://github.com/Morgan-Gicheha/Payment-Gateway-v2) .
it will have better docs and I am maintaining it.
