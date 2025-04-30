#FROM ubuntu:20.04
FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package*.json .

# get dependencies
RUN npm install

# copy source files
COPY . .

# run the app
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
