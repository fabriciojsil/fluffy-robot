FROM node:10.16.3-alpine
LABEL maintainer="fabriciojsil@gmail.com"

RUN mkdir app
WORKDIR app

COPY ./src ./src
COPY ./.env ./.env
COPY ./package* ./
COPY ./tsconfig.json .

RUN npm install
RUN npm run build

CMD ["node", "dist/index.js"]
