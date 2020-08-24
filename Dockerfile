FROM cypress/base:12

LABEL maintainer=Exzeo

ARG NPM_TOKEN
ENV PORT="3000"
ENV EXTEND_ESLINT="true"
ENV CYPRESS_BASE_URL="http://localhost:3000"
ENV CYPRESS_API_URL="http://falcon:3000"

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
WORKDIR /app

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc

COPY package.json package-lock.json /app/
RUN npm ci

COPY . /app

# cleanup
RUN npm cache clean --force && \
 rm -f .npmrc

CMD ["npm", "run", "start"]

