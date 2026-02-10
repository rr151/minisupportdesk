# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

# Stage 2: Production avec Nginx
FROM nginx:alpine

# Copier les fichiers buildés depuis le stage précédent
COPY --from=build /app/dist/ticket /usr/share/nginx/html

# Copier la configuration Nginx (optionnel)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]