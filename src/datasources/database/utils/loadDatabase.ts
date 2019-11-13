import { IConfiguration } from "../../../utils/config";
import { logger } from "../../../utils/logger";
import { configureSequelize } from "./configureSequelize";

export interface IDatabase {
  // TODO - Update interface
  // User: typeof User;
}

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
    // TODO - Initialize DB models
    // User: UserFactory(sequelize),
  };

  // Add relations
  // TODO - Add relationships

  return db;
};
