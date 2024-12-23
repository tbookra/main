# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app
COPY prisma/ /app/prisma/
# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
