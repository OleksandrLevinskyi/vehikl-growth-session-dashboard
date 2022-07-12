FROM node:17.8-alpine
WORKDIR /app
RUN npm install
EXPOSE 3000
#CMD npm start