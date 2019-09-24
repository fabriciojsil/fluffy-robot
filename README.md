# fluffy-robot

### Run tests

```sh
  npm test
```

### Environment Variables

There are 2 (Two) variables to be setted:

```sh
  PORT # this is the port the application will Run
  FLIGHT_API_URL=http://localhost:3006 # this is the endpoint for the flight service without the slug
```

Those Environment Variables must be configured in the `.env` file.

### Starting the application - local environment with live reload

```sh
  npm start
```

### Starting the application - docker-compose with live reload

```sh
  docker-compose up # is comfigured to use PORT 3000. set this port on .env
```

### Build and start a docker image image

```sh
  docker build  -t comtravo .
  docker run -p ${EXTERNAL_PORT}:${PORT_ENV_CONFIGURED} -it comtravo:latest
```

### How to use

```sh
  curl http://localhost:${PORT}
```
