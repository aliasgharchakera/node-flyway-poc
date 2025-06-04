require("dotenv").config();
const { Flyway } = require("node-flyway");
const path = require("path");

// Get environment from command line argument or default to development
const environment = process.argv[2] || "development";
const envFile = `.env.${environment}`;

// Load environment-specific variables
require("dotenv").config({ path: envFile });

console.log(`Running migrations for environment: ${environment}`);

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
