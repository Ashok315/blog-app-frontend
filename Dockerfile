FROM node:16.17.1-alpine3.16
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . /usr/app
RUN npm run build