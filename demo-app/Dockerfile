#FROM node:14.18 as development
FROM ubuntu:20.04 as development

WORKDIR /usr/src/app

COPY package*.json .

# install node
RUN apt-get update
RUN apt-get install -y curl gnupg
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs

# get dependencies
RUN npm install

COPY . .

RUN npm run build

#FROM node:14.18 as production
FROM ubuntu:20.04 as production

ARG NODE_ENV=production
ENV MODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

# install node
RUN apt-get update
RUN apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.18  | bash -
RUN apt-get -y install nodejs

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/onbworker.js"]