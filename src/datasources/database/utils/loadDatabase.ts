import { IConfiguration, logger } from "../../../utils";
import { configureSequelize } from "./configureSequelize";
import { UserFactory } from "../user";
import { IDatabase } from "../";

export const loadDatabase = (config: IConfiguration) => {
  const sequelize = configureSequelize(config);

  // Check Database Connection
  sequelize
    .authenticate()
    .then(() => {
      logger.info("Connection has been established successfully.");
    })
    .catch((err: Error) => {
      logger.error("Unable to connect to the database:", err);
    });

  const db: IDatabase = {
    User: UserFactory(sequelize),
  };

  // Add relations
  // TODO - Add relationships

  return db;
};
