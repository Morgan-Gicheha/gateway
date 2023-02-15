
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

Take it, if you like it. just make sure you add authentication.
if you want to use it for payments, you can add a cache on the gateway level to prevent users from withdrawing the same amount within a certain period of time (maybe 5 min)

