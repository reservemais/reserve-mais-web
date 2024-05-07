FROM node:18

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./client/package*.json ./client/package-lock.json ./
COPY ./.env ./

# Install dependencies in /app
RUN npm install

# Copy the rest of our Next.js folder into /app
COPY ./client .

# Ensure port 3005 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line
CMD [ "npm", "run", "dev" ]
