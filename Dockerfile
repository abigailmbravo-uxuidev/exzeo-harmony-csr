FROM mhart/alpine-node:8
MAINTAINER Exzeo

ENV NODE_ENV=production

RUN mkdir -p /app
RUN mkdir -p /app/server
RUN mkdir -p /app/src
RUN mkdir -p /app/src/css

WORKDIR /app

COPY package.json /app/

COPY .  /app

WORKDIR /app

RUN apk update && apk --no-cache add bash libc6-compat && \
  npm install && \
  npm run build && \
  npm cache clean --force

CMD ["npm", "start"]