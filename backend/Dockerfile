# Utilisation d'une image Node légère
FROM node:20-alpine

# Création du répertoire de travail
WORKDIR /usr/src/app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code
COPY . .

# Génération du client Prisma (si tu utilises Prisma)
# RUN npx prisma generate

# Exposition du port
EXPOSE 3000

# Commande pour lancer l'application en mode développement
CMD ["npm", "run", "start:dev"]