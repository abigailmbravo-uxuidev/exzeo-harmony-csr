FROM node:8-alpine

LABEL maintainer=Exzeo
 
ARG NPM_TOKEN 

COPY package.json package.json  

ARG NPM_TOKEN

COPY package.json package.json  

COPY . /app

WORKDIR /app

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc

# Install app
RUN apk update && apk --no-cache add bash libc6-compat && \
 npm install && \
 mv .default.env .env && \
 npm run build && \
 npm cache clean --force

RUN rm -f .npmrc

RUN rm -f .npmrc

CMD ["npm", "run", "server"]

