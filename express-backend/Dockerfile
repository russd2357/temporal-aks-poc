# base image
FROM node:14.18

# set up working directory
WORKDIR /app

# install dependencies
COPY package*.json ./

RUN npm install

# get source code
COPY . .

# expose the service port
EXPOSE 9099

# start the server
CMD ["npm", "start"]