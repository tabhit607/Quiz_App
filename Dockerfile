FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Copy environment variables
COPY .env .env

# Expose the port your app runs on
EXPOSE ${PORT}

# Command to run the app
CMD ["node", "src/index.js"]
