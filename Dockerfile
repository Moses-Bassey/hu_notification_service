#!/bin/bash

FROM node:22-alpine As development

WORKDIR /home/app

# Install necessary tools, including Git
RUN apk add --no-cache git

RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app

# copy the package.json file before the rest of the code to take advantage of Docker layer caching
COPY package*.json ./

# Switch user to node to ensure that all application files are owned by none root user node
USER node

RUN yarn install --development --network-timeout 100000

# copy the rest of the application files and set the right user permissions
COPY --chown=node:node . .

# build application in the current working directory
RUN yarn build

###############################################

FROM node:22-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/app

# Install necessary tools, including Git
RUN apk add --no-cache git

# create the app and node modules folder with the right permissions to allow future npm install
RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app

# copy the package.json file before the rest of the code to take advantage of Docker layer caching
COPY package*.json ./

# Switch user to node to ensure that all application files are owned by none root user node
USER node

RUN yarn install --production --network-timeout 100000
# copy the rest of the application files and set the right user permissions
COPY --chown=node:node . .

# copy built dist folder to production context
COPY --from=development --chown=node:node /home/app/dist ./dist

EXPOSE 3000

CMD [ "sh", "-c", "yarn start:prod"]