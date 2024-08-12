FROM node:18-alpine
WORKDIR /frontend-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN rm -rf /var/www/html/*
COPY /frontend-app/* /var/www/html
CMD ["sudo","systemctl","reload","nginx"]


