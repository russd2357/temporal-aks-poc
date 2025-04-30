FROM node:20-bullseye AS development
#FROM ubuntu:20.04 as development

WORKDIR /usr/src/app

COPY package*.json .

# get dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:20-bullseye AS production
#FROM ubuntu:20.04 as production

ARG NODE_ENV=production
ENV MODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/onbworker.js"]