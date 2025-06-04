require("dotenv").config();
const { Flyway } = require("node-flyway");
const path = require("path");
const fs = require("fs");

// Get environment from command line argument or default to development
const environment = process.argv[2] || "development";
const envFile = `.env.${environment}`;

// Check if environment file exists
if (!fs.existsSync(envFile)) {
  console.error(`Error: Environment file ${envFile} not found!`);
  process.exit(1);
}

// Load environment-specific variables
require("dotenv").config({ path: envFile, override: true });

// Debug information
console.log(`Running migrations for environment: ${environment}`);
console.log("Database configuration:");
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Port: ${process.env.DB_PORT}`);
console.log(`Database: ${process.env.DB_NAME}`);
console.log(`User: ${process.env.DB_USER}`);

const flyway = new Flyway({
  url: `jdbc:postgresql://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrationLocations: ["migrations"],
  // Add environment-specific table name to track migrations separately
  table: `flyway_schema_history_${environment}`,
});

(async () => {
  try {
    console.log("\nStarting migration...");
    const result = await flyway.migrate();
    if (!result.success) {
      throw new Error(
        result.error ? result.error.errorCode : "Migration failed"
      );
    }
    console.log(
      `Migrations applied successfully to ${environment} environment!`
    );
  } catch (err) {
    console.error(`Migration failed for ${environment} environment:`, err);
    process.exit(1);
  }
})();
