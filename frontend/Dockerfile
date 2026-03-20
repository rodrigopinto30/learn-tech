FROM node:22-alpine

WORKDIR /usr/src/app

RUN npm install -g npm@latest

EXPOSE 3000

CMD ["sh", "-c", "npm install && npm run dev"]