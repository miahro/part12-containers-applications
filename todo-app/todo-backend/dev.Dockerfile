FROM node:16

WORKDIR /usr/src/app

#build ENV parameters overridden by docker-compose paramaters 
ENV PORT=3001
ENV REDIS_URL=redis://localhost:6379
ENV MONGO_URL=mongodb://the_username:the_password@localhost:27017/the_database 

COPY . .
RUN npm install

CMD ["npm", "run", "dev"]