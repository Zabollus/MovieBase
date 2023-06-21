FROM node:16-alpine
WORKDIR /react

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]