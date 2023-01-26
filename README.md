
## .....

every microservice should expose a `/health`  endpoint.
This endpoint should do a simulation of all dependancies that might block
requests from going through.
e.g -  the endpoints should connect to the db and do a read to test the connection
NB:  this has been implemented in the gateway yet

2 . All services should be registered in the `jsonServices/services.json` file - done


3 . gateway to handle rate limiting and service attacks - done with helmet js


4 .  gateway to handle token based auth - not done
5 . gateway to handle logging - not done
6 . gateway to report fraudulent activities - not done
7 . gateway to implement honey-pots for security - not done


```bash

```

