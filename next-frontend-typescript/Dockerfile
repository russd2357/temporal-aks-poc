FROM ubuntu:20.04

WORKDIR /usr/src/app

COPY package*.json .

# install node
RUN apt-get update
RUN apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs

# get dependencies
RUN npm install

# copy source files
COPY . .

# run the app
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
