FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 7070

CMD ["npm", "run", "dev"]
