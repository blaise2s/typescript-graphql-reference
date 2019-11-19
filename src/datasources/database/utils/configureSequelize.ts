import { Sequelize, ModelOptions } from "sequelize";
import { IConfiguration, logger } from "../../../utils";
import localDatabaseEnvironments from "../config/database";

export const configureSequelize: (config: IConfiguration) => Sequelize = (config) => {
  const define: ModelOptions = {
    timestamps: false,
    freezeTableName: true,
  };
  const logging = (str: string) => logger.debug(str);
  const env = config.env;

  if (config.offlineLocal) {
    const dbEnv = localDatabaseEnvironments[env];
    if (dbEnv) {
      define.schema = dbEnv.schema;
      return new Sequelize({
        dialect: dbEnv.dialect,
        username: dbEnv.username,
        password: dbEnv.password,
        host: dbEnv.host,
        port: dbEnv.port,
        database: dbEnv.database,
        define,
        pool: {
          max: dbEnv.maxPoolSize,
        },
        logging,
      });
    } else {
      throw new Error(`offline, local development mode is enabled, but a database config doesn't exist for the '${env}' environment`);
    }
  } else {
    const db = config.database;
    define.schema = db.schema;
    return new Sequelize({
      dialect: db.dialect,
      username: config.secrets.db_user,
      password: config.secrets.db_pswd,
      host: db.host,
      port: db.port,
      database: db.name,
      define,
      pool: {
        max: db.poolSize,
      },
      logging,
      // TODO - Do you need to use ssl?
      // dialectOptions: {
      //   ssl: { require: true },
      // },
    });
  }
};
