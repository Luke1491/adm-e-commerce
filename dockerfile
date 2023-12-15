# Stage 1: Build the Next.js application
FROM node:20.10-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire app and build
COPY . .
RUN npm run build

# Stage 2: Create a smaller image with only the necessary artifacts
FROM node:20.10-alpine

WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

# Install only production dependencies
RUN npm install --production

# Set the command to start the Next.js app
CMD ["npm", "start"]