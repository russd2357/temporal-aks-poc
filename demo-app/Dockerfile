# base image
FROM node:14.18 as development

# setup working direc
WORKDIR /app

# get dependencies
COPY ./src/package*.json .

RUN npm install

# get source code
COPY . .

RUN npm run build

FROM node:14.18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_DEV}

# setup working direc
WORKDIR /app

# get dependencies
COPY ./src/package*.json .

RUN npm install --only=production

COPY --from=development /app/dist ./dist

# run the worker
CMD ["node", "./dist/onbworker.js"]