# Dockerfile - React app builder and server
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source files
COPY public/ ./public/
COPY src/ ./src/

# Build the app
ARG REACT_APP_MAPBOX_ACCESS_TOKEN=pk.test.mock-token-for-testing-purposes
ARG REACT_APP_MAPBOX_STYLE=mapbox://styles/mapbox/streets-v11
ENV REACT_APP_MAPBOX_ACCESS_TOKEN=$REACT_APP_MAPBOX_ACCESS_TOKEN
ENV REACT_APP_MAPBOX_STYLE=$REACT_APP_MAPBOX_STYLE

RUN npm run build

# Production stage using serve
FROM node:18-alpine AS production

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/build ./build

EXPOSE 3006

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -q --spider http://localhost:3006 || exit 1

CMD ["serve", "-s", "build", "-l", "3006"]
