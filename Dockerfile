FROM node:15-alpine

RUN mkdir -p /home/node/api/node_modules
WORKDIR /home/node/api

COPY package.json yarn.* ./

RUN yarn

COPY . .

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz


EXPOSE 3333

ENTRYPOINT [ "yarn", "dev" ]
