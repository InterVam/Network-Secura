FROM node:16-alpine

WORKDIR /app

RUN npm install -g expo-cli

COPY . .

RUN npm install

CMD ["expo", "start"]