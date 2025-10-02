# Step 1: Build the React app using Vite
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy environment variables
COPY .env.local .env.local

# Copy the rest of the app and build it
COPY . .
RUN npm run build --force

# Step 2: Serve the build with nginx
FROM nginx:stable-alpine

# Remove the default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy a custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

