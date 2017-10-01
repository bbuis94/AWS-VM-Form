FROM node:boron

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

# Bundle app source
COPY . /app

EXPOSE 8080
EXPOSE 80
EXPOSE 27017
CMD [ "npm", "start" ]
