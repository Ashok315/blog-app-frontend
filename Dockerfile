FROM node:alpine3.20 as build 
WORKDIR /frontend-app
COPY  package.json .
RUN npm install
COPY . .
RUN npm run build
RUN rm -rf /var/www/html/*
COPY --from=build /frontend-app/build /var/www/html
CMD ["sudo","systemctl","reload","nginx"]


