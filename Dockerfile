# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Production stage
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
