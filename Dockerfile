FROM node:8-alpine

LABEL maintainer=Exzeo

COPY . /app

WORKDIR /app

# Install app
RUN apk update && apk --no-cache add bash libc6-compat && \
  npm install && \
  mv .default.env .env && \
  npm run build && \
  npm cache clean --force

CMD ["npm", "run", "server"]
