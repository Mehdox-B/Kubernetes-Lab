FROM node:20-alpine

RUN mkdir -p /home/backend

COPY . /home/backend

WORKDIR /home/backend

RUN npm install

CMD ["node","server.mjs"]

EXPOSE 5000

