# Node Flyway POC

This is a proof-of-concept Node.js project demonstrating database migrations using [node-flyway](https://www.npmjs.com/package/node-flyway) with multiple PostgreSQL databases for different environments.

## Prerequisites
- Node.js (v14+ recommended)
- Docker and Docker Compose
- Git

## Setup

### 1. Clone and Install
```sh
git clone https://github.com/aliasgharchakera/node-flyway-poc.git
cd node-flyway-poc
npm install
```

### 2. Set Up Databases with Docker

Run the following commands to create PostgreSQL containers for each environment:

```sh
# Development Database (Port 5432)
docker run --name flyway-postgres-dev \
  -e POSTGRES_DB=flyway_poc_dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:latest

# Test Database (Port 5433)
docker run --name flyway-postgres-test \
  -e POSTGRES_DB=flyway_poc_test \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5433:5432 \
  -d postgres:latest

# Staging Database (Port 5434)
docker run --name flyway-postgres-stg \
  -e POSTGRES_DB=flyway_poc_stg \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5434:5432 \
  -d postgres:latest

# Production Database (Port 5435)
docker run --name flyway-postgres-prod \
  -e POSTGRES_DB=flyway_poc_prod \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5435:5432 \
  -d postgres:latest
```

## Usage

### Running Migrations

Run migrations for specific environments:
```sh
# Development
npm run migrate:dev

# Test
npm run migrate:test

# Staging
npm run migrate:staging

# Production
npm run migrate:prod

# All environments
npm run migrate:all
```

### Docker Container Management

Stop containers:
```sh
docker stop flyway-postgres-dev flyway-postgres-test flyway-postgres-stg flyway-postgres-prod
```

Start containers:
```sh
docker start flyway-postgres-dev flyway-postgres-test flyway-postgres-stg flyway-postgres-prod
```

Remove containers:
```sh
docker rm -f flyway-postgres-dev flyway-postgres-test flyway-postgres-stg flyway-postgres-prod
```

## Migration Files
- Place your SQL migration files in the `migrations/` directory
- Files should follow the naming convention: `V{number}__{description}.sql`
- Example: `V1__init.sql`, `V2__add_table.sql`

## Database Access

Connect to any database using psql:
```sh
# Development
psql -h localhost -p 5432 -U postgres -d flyway_poc_dev

# Test
psql -h localhost -p 5433 -U postgres -d flyway_poc_test

# Staging
psql -h localhost -p 5434 -U postgres -d flyway_poc_stg

# Production
psql -h localhost -p 5435 -U postgres -d flyway_poc_prod
```

Password for all databases: `postgres`

---
This project is for demonstration purposes only. 