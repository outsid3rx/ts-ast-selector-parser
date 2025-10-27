FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Copy workspace package.json files
COPY packages/selector-parser/package.json ./packages/selector-parser/package.json
COPY packages/example/package.json ./packages/example/package.json
COPY packages/example-server/package.json ./packages/example-server/package.json

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the @cast/selector-parser workspace
RUN yarn workspace @cast/selector-parser build

# Run yarn install in the root again to ensure all dependencies are properly linked
RUN yarn install

# Build @cast/example
RUN yarn workspace @cast/example build

# Install NestJS CLI globally
RUN yarn global add @nestjs/cli

# Build @cast/example-server
RUN yarn workspace @cast/example-server build

# Expose the server port (assuming it runs on port 3000 by default for NestJS)
EXPOSE 1337

# Start the example-server
CMD ["yarn", "workspace", "@cast/example-server", "start:prod"]