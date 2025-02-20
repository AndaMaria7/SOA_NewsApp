# Utiliser une image officielle de Node.js
FROM node:16

# Créer un répertoire pour l'application dans le container
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install --legacy-peer-deps

# Installer les dépendances de l'application
RUN npm install --legacy-peer-deps

# Copier tous les autres fichiers du projet
COPY . .

# Compiler l'application NestJS
RUN npm run build

# Exposer le port de l'application (3000)
EXPOSE 3000

# Lancer l'application
CMD ["npm", "run", "start:dev"]
