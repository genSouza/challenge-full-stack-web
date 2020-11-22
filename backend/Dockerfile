FROM node:alpine

#install Nestjs
RUN npm i -g @nestjs/cli
RUN npm install -g ts-node

# Run app
#install app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm","run","start:dev"]
