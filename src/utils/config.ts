import fs from "fs";
import { logger } from "../utils/logger";
import path from "path";

export type Dialect = "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";

export interface IConfiguration {
  env: string;
  logLevel: string;
  port: number;
  secrets: { [key: string]: string };
  database: {
    dialect: Dialect;
    host: string;
    port: number;
    name: string;
    schema: string;
    poolSize: number;
  };
}

/**
 * Loads all secret files inside given secretPath and returns map, with key - filename, value - contents
 * @param secretPath
 */
const loadSecrets = (secretPath: string) => {
  let secrets = {};

  try {
    const secretFiles = fs.readdirSync(secretPath);

    secrets = secretFiles.reduce<{ [key: string]: string }>((accumulatedSecrets, filename) => {
      const filePath = path.join(secretPath, filename);

      if (!fs.statSync(filePath).isFile()) {
        logger.warn(`config: skipping ${filePath}, not a file`);
        return accumulatedSecrets;
      }

      const contents = fs.readFileSync(filePath, "utf8");
      if (contents) {
        accumulatedSecrets[filename] = contents.replace(/^\s+|\s+$/g, "");
      }

      return accumulatedSecrets;
    }, {});
  } catch (error) {
    throw new Error(`Failed to load secrets at ${secretPath}${error.message ? `: ${error.message}` : ""}`);
  }

  return secrets;
};

export const loadConfig: () => IConfiguration = () => {
  if (!process.env.NODE_ENV || !process.env.PORT || !process.env.SECRET_PATH || !process.env.LOG_LEVEL) {
    throw new Error("Environment variables NODE_ENV, PORT, SECRET_PATH, and LOG_LEVEL are required");
  }

  if (!process.env.DB_DIALECT || !process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_NAME || !process.env.DB_SCHEMA || !process.env.DB_MAX_POOL_SIZE) {
    throw new Error("Database environment variables DB_DIALECT, DB_HOST, DB_PORT, DB_NAME, DB_SCHEMA and DB_MAX_POOL_SIZE are required");
  }

  let verifiedDialect: Dialect;
  const dialect = process.env.DB_DIALECT;
  if (dialect === "mysql" || dialect === "postgres" || dialect === "sqlite" || dialect === "mariadb" || dialect === "mariadb") {
    verifiedDialect = dialect;
  } else {
    throw new Error('DB_DILECT must be one of "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql"');
  }

  const secrets = loadSecrets(process.env.SECRET_PATH);
  const secretKeys = Object.keys(secrets);
  if (!secretKeys.includes("db_user") || !secretKeys.includes("db_pswd")) {
    throw new Error("Secrets containing db_user and db_pswd are required");
  }

  const env = process.env.NODE_ENV;
  const baseConfig = {
    env,
    port: +process.env.PORT,
    secrets,
    logLevel: process.env.LOG_LEVEL,
    database: {
      dialect: verifiedDialect,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      name: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      poolSize: +process.env.DB_MAX_POOL_SIZE,
    },
  };

  if (env === "development") {
    return baseConfig;
  } else {
    // TODO - Does anythhing need to be configured differently for production
    return baseConfig;
  }
};
