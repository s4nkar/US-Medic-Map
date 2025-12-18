# Use Node 20 to match your local environment
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Start Next.js
CMD ["npm", "run", "dev"]