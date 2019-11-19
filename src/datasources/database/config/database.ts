import { Dialect } from "../../../utils";

export interface IDatabaseConfig {
  dialect: Dialect;
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
  schema: string;
  maxPoolSize: number;
  seederStorage: "sequelize" | "json" | "none";
  seederStorageTableName: string;
  migrationStorage: "sequelize" | "json" | "none";
  migrationStorageTableName: string;
}

export interface IDatabaseEnvironments {
  [key: string]: IDatabaseConfig;
}

const localDatabaseEnvironments: IDatabaseEnvironments = {
  development: {
    dialect: "postgres",
    username: "offlineLocal",
    password: "development",
    host: "127.0.0.1",
    port: 54320,
    database: "typescript_graphql_reference",
    schema: "public",
    maxPoolSize: 10,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    migrationStorage: "sequelize",
    migrationStorageTableName: "SequelizeMeta",
  },
};
export default localDatabaseEnvironments;

module.exports = localDatabaseEnvironments;
