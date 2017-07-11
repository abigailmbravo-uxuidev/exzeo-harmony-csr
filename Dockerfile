FROM mhart/alpine-node:7.10.0
MAINTAINER Exzeo

ENV NODE_ENV=development
ENV REACT_APP_API_URL=http://www.harmony-ins.com/api

RUN mkdir -p /app
RUN mkdir -p /app/src
RUN mkdir -p /app/src/css

WORKDIR /app

COPY package.json /app/

COPY .  /app

WORKDIR /app

RUN apk update && apk --no-cache add bash libc6-compat nano && \
  npm install && \
  npm run build && \
  npm cache clean

ENTRYPOINT ["node", "server"]
