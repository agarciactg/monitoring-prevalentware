
# Use an official Node.js runtime as a parent image
FROM node:16.13

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Limpiar la caché de npm
RUN npm cache clean --force

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 9090

# Define the command to run your app
CMD ["npm", "start"]
