# frontend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production

FROM nginx:1.27-alpine AS runtime

# Angular 17+ (new application builder) outputs to dist/<project-name>/browser
# Angular 16 or older (webpack builder) outputs to dist/<project-name> directly — no /browser subfolder
COPY --from=build /app/dist/jobpilotui/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
