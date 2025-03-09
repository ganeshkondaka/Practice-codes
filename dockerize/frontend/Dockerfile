# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build React app
RUN npm run build

# Expose the port
EXPOSE 3000

# Serve the build using a simple HTTP server
CMD ["npx", "serve", "-s", "dist"]
