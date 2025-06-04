require("dotenv").config();
const { Flyway } = require("node-flyway");

const flyway = new Flyway({
  url: `jdbc:postgresql://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrationLocations: ["migrations"],
});

(async () => {
  try {
    const result = await flyway.migrate();
    if (!result.success) {
      throw new Error(
        result.error ? result.error.errorCode : "Migration failed"
      );
    }
    console.log("Migrations applied successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
})();
