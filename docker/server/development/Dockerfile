FROM node:18

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./server/package*.json ./server/package-lock.json ./
COPY ./.env ./

# Install dependencies in /app
RUN npm install

# Copy the rest of our Strapi folder into /app
COPY ./server .

EXPOSE 1337

# Run yarn dev, as we would via the command line
CMD ["npm", "run", "develop"]
