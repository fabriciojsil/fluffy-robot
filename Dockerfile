FROM node:10.16.3-alpine as builder
LABEL maintainer="fabriciojsil@gmail.com"

RUN mkdir app

WORKDIR app

COPY ./src ./src
COPY ./package* ./
COPY ./tsconfig.json .

RUN npm install
RUN npm run build


FROM node:10.16.3-alpine

RUN mkdir app
WORKDIR app
COPY --from=builder /app/dist ./

CMD ["node", "index.js"]
