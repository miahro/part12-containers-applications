FROM node:16

WORKDIR /usr/src/app

ENV PORT=3001

COPY --chown=node:node . .
#COPY . .
RUN npm ci --only=production


USER node
CMD npm start