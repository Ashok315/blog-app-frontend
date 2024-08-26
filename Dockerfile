FROM node:16.17.1-alpine3.16 
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . /usr/app

# pass environment variable
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

# build applicaion
RUN npm run build