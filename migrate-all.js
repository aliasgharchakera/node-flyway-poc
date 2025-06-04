const { execSync } = require("child_process");

const environments = ["development", "staging", "production"];

console.log("Starting migrations across all environments...\n");

environments.forEach((env) => {
  console.log(`\n=== Migrating ${env} environment ===`);
  try {
    execSync(`node migrate.js ${env}`, { stdio: "inherit" });
    console.log(`✓ ${env} migrations completed successfully\n`);
  } catch (error) {
    console.error(`✗ ${env} migrations failed\n`);
    process.exit(1);
  }
});

console.log("All environments migrated successfully!");
