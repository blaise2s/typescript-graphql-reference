import fs from "fs";
import inquirer from "inquirer";
import path from "path";

/**
 * Interactive script to create/update .env file for local development
 * Will load existing values from .env and use them as defaults
 */

// only these keys will be present in final .env file
const validKeys = ["NODE_ENV", "LOG_LEVEL", "PORT", "SECRET_PATH", "DB_DIALECT", "DB_HOST", "DB_PORT", "DB_NAME", "DB_SCHEMA", "DB_MAX_POOL_SIZE"];

const defaultSecretPath = path.join(__dirname, "..", ".secrets");
const promptConfig = [
  {
    type: "input",
    message: ".env filename:",
    name: "envFilename",
    default: ".env",
  },
  {
    type: "input",
    message: "Node environment:",
    name: "NODE_ENV",
    default: process.env.NODE_ENV || "dev",
  },
  {
    type: "input",
    message: "Log level:",
    name: "LOG_LEVEL",
    default: process.env.LOG_LEVEL || "dev",
  },
  {
    type: "number",
    message: "Service port:",
    name: "PORT",
    default: process.env.PORT || 4005,
  },
  {
    type: "input",
    message: "Secret path (where db_user and db_pswd are stored. These files contain the db username and password, respectively. Add the user and pswd to these files):",
    name: "SECRET_PATH",
    default: process.env.SECRET_PATH || defaultSecretPath,
  },
  // DB_MAX_POOL_SIZE: number;
  {
    type: "input",
    message: "DB dialect (must be one of 'mysql', 'postgres', 'sqlite', 'mariadb', or 'mssql'):",
    name: "DB_DIALECT",
    default: process.env.DB_DIALECT || "postgres",
  },
  {
    type: "input",
    message: "DB host:",
    name: "DB_HOST",
    default: process.env.DB_HOST || "localhost",
  },
  {
    type: "number",
    message: "DB port:",
    name: "DB_PORT",
    default: process.env.DB_PORT || 5432,
  },
  {
    type: "input",
    message: "DB name:",
    name: "DB_NAME",
    default: process.env.DB_NAME || "typescript_graphql_reference",
  },
  {
    type: "input",
    message: "DB schema:",
    name: "DB_SCHEMA",
    default: process.env.DB_SCHEMA || "public",
  },
  {
    type: "number",
    message: "DB max pool size:",
    name: "DB_MAX_POOL_SIZE",
    default: process.env.DB_MAX_POOL_SIZE || 10,
  },
];

void (async () => {
  const answers: any = await inquirer.prompt(promptConfig);
  const envPath = path.join(__dirname, "..", answers.envFilename);

  const envBody = Object.keys(answers)
    .filter((key) => validKeys.includes(key))
    .map((key) => `${key}=${answers[key]}`)
    .join("\n");
  fs.writeFileSync(envPath, envBody, "utf-8");

  const secretPath = answers.SECRET_PATH;
  if (!fs.existsSync(secretPath)) {
    if (secretPath !== defaultSecretPath) {
      console.log("***************************************************************************");
      console.log("The git ignore is configured to ignore the default '.secrets` folder.");
      console.log("You entered a secret path different from the default, please update");
      console.log("the git ignore if necessary and remember to NEVER commit sensitive data.");
      console.log("***************************************************************************");
    }
    fs.mkdirSync(secretPath);
    fs.writeFileSync(path.join(secretPath, "db_user"), "ADD-DB-USER-HERE", "utf-8");
    fs.writeFileSync(path.join(secretPath, "db_pswd"), "ADD-DB-PASSWORD-HERE", "utf-8");
  }
})();
