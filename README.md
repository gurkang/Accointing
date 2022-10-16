## Description

Take home assignment for backend engineer

## About

The application exposes four endpoints for the user, three of which requires authentication to use.
* `GET /binance/symbolPairs?pageNumber=x&pageSize=y` Where you can retrieve the existing symbol trading pairs from the Binance spot trading. 
* `GET /binance/symbolPairs/trades?symbol=xyz` Where you can see all recent trades for a given symbol trading pair, ex `ETHBTC`.
* `PUT /binance/symbolPairs/trades?symbol=xyz&trades=123` Where you can force and update to the recent trades of any symbol trading pair, example `ETHBTC`.
* `POST /auth/login` Where you can login and get authenticated and returned a `JWT token` in order to access the above mentioned three endpoints. Include the login credentials in the `body` of the request.

## Authentication
Authentication is very simple since this isn't a production ready application. Use the following credentials in the request body as `JSON` to get authenticated to the API:
```
"username": "accointing"
"password": "accointing"
```

## Running the application

Everything is included in the docker-compose file and you should be able to run the application by just running `sh setupscript.sh`. You may have to do a `sudo` command to run is succesfully.

If you are using a Windows machine and you aren't using `WSL` then you can try to run the commands in the `setupscript` manually. I am not sure about the specifics on Windows machines to get it working.

If you want to debug the main application while still having a connectio to Redis and Postgres then just run the docker-compose file manually: `docker-compose up -d` and start the application yourself in editor of your choice.

## Swagger

You can find swagger documentation and a simple playground after running the application locally at `localhost:3000/api`.
