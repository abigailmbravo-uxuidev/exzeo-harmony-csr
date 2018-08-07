FROM node:10-alpine

LABEL maintainer=Exzeo
 
ARG NPM_TOKEN 

WORKDIR /app

COPY package.json package-lock.json ./

ARG NPM_TOKEN

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc

# Install app
RUN apk update && apk --no-cache add bash libc6-compat g++ make python && \
 npm ci && \
 mv .default.env .env && \
 npm run build && \
 npm cache clean --force

RUN rm -f .npmrc

CMD ["npm", "run", "server"]

