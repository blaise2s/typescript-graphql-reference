import { Sequelize } from "sequelize";
import { IConfiguration } from "../../../utils/config";
import { logger } from "../../../utils/logger";

export const configureSequelize = (config: IConfiguration) => {
  const db = config.database;
  return new Sequelize({
    dialect: db.dialect,
    username: config.secrets.db_user,
    password: config.secrets.db_pswd,
    host: db.host,
    port: db.port,
    database: db.name,
    define: {
      schema: db.schema,
      timestamps: false,
      freezeTableName: true,
    },
    pool: {
      max: db.poolSize,
    },
    logging: (str) => logger.debug(str),
    // TODO - Do you need to use ssl?
    // dialectOptions: {
    //   ssl: { require: true },
    // },
  });
};
