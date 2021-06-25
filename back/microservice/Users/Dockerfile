FROM node:current-alpine3.13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3008

CMD ["npm", "start"]