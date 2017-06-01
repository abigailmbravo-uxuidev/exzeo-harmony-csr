FROM mhart/alpine-node:7.10.0
MAINTAINER Exzeo

ENV NODE_ENV=production
ENV REACT_APP_API_URL=http://www.harmony-ins.com/api

RUN mkdir -p /app
RUN mkdir -p /app/src
RUN mkdir -p /app/src/css

WORKDIR /app

COPY .  /app

WORKDIR /app

RUN apk update && apk --no-cache add bash libc6-compat nano
RUN npm install
RUN npm run build
RUN npm cache clean

ENTRYPOINT ["node", "server"]
