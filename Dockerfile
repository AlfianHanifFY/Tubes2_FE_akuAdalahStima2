# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build Tailwind CSS
# Build Tailwind CSS
RUN npm run build:css

RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
