FROM node:16-alpine
WORKDIR /react

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "start"]