# Node Flyway POC

This is a proof-of-concept Node.js project demonstrating database migrations using [node-flyway](https://www.npmjs.com/package/node-flyway) with a local PostgreSQL database.

## Prerequisites
- Node.js (v14+ recommended)
- PostgreSQL (running locally)

## Setup
1. Clone this repo or copy the files to your workspace.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory with your PostgreSQL connection details:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   ```
4. Ensure your PostgreSQL server is running and the database exists.

## Usage
- To run migrations:
  ```sh
  node migrate.js
  ```

## Migration Files
- Place your SQL migration files in the `migrations/` directory. Example: `V1__init.sql`, `V2__add_table.sql`, etc.

---
This project is for demonstration purposes only. 