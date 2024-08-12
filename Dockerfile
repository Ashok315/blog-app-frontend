# FROM node:18-alpine
# WORKDIR /frontend-app
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build
# RUN rm -rf /var/www/html/*
# COPY /frontend-app/* /var/www/html
# CMD ["sudo","systemctl","reload","nginx"]
FROM node:16.17.1-alpine3.16 as build
WORKDIR /usr/app
COPY . /usr/app
RUN npm install
RUN npm run build

FROM nginx:1.23.1-alpine
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html


