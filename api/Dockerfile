# Build AdonisJS
FROM node:16-alpine as builder
# Set directory for all files
WORKDIR /home/node/app
# Copy over package.json files
COPY package*.json ./
# Install all packages
RUN npm install
# Copy over source code
COPY . .
# Build AdonisJS for production
RUN npm run build --production


# Build final runtime container
FROM node:16-alpine
# Set environment variables
ENV NODE_ENV=production
# Disable .env file loading
ENV ENV_SILENT=true
# Listen to external network connections
# Otherwise it would only listen in-container ones
ENV HOST=0.0.0.0
# Set port to listen
ENV PORT=3333
# Set app key at start time
ENV APP_KEY=vfUL7RVOpBo7yV7Ht8LG-4fkjR6e2w60
ENV DRIVE_DISK=local
# Set home dir
WORKDIR /home/node/app
# Copy over built files
COPY --from=builder /home/node/app/build .
# Install only required packages
RUN npm ci --production
# Expose port to outside world
EXPOSE 3333
# Start server up
CMD [ "node", "server.js" ]