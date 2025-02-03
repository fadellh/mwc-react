# ----- Build Stage -----
FROM --platform=linux/amd64 node:16-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the entire source code and build the app using Vite
COPY . .
RUN yarn build

# ----- Production Stage -----
FROM --platform=linux/amd64 nginx:alpine

# Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration into the container
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the production build output (from the builder stage) to Nginx’s web root
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
