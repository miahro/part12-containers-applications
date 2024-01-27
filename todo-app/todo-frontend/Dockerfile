
FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . . 

ENV REACT_APP_BACKEND_URL=http://localhost:3001/


EXPOSE 3000
RUN npm ci
RUN npm run build

RUN CI=true npm test

CMD ["npm", "start"]