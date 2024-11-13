FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

# ENV NODE_ENV=production

CMD ["yarn", "run", "prod"]