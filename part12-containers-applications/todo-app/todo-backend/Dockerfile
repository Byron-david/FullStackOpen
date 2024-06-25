FROM node:20
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=playground:*

ENV Mongo=MONGO_URL

ENV REDIS=REDIS_URL

USER node

CMD npm start