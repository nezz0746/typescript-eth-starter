FROM node:16.14.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 4009
CMD [ "npm", "run", "dev" ]
