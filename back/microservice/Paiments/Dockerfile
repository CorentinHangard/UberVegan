FROM node:current-alpine3.13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3005

CMD ["npm", "start"]