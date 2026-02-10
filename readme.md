# MiniSupport

## Prérequis
- Docker & Docker Compose

## Installation & Lancement
1. Depuis le dossier racine `minisupport/` :
docker-compose up -d 

## Charger les données tests et les comptes par défaut
2. docker exec -it minisupport-api-1 npx ts-node src/seed.ts

## Compte de test

| Rôle     | Email                                         | Mot de passe |
| -------- | --------------------------------------------- | ------------ |
| Agent    | [agent@test.com](mailto:agent@test.com)       | Test1234     |
| Customer | [customer@test.com](mailto:customer@test.com) | Test1234     |

## Choix techniques et compromis
Choix techniques et compromis

Backend : NestJS pour rester en TypeScript et garder la structure stricte, similaire à Angular.

Frontend : Angular pour cohérence avec le backend et pratique pour RxJS / composants modulaires.

Base de données : PostgreSQL avec TypeORM pour la simplicité d’intégration et les migrations automatiques.

Compromis : certaines validations et logs sont basiques pour respecter les délais, mais la structure reste extensible.

## Swagger / API Documentation
http://localhost:3000/api

##
