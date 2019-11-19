import { QueryInterface, Sequelize } from "sequelize";
import { userAttrsV1 } from "../models/attributes";

module.exports = {
  up: (queryInferface: QueryInterface, _sequelize: Sequelize) => {
    return queryInferface.createTable("users", userAttrsV1);
  },
  down: (queryInferface: QueryInterface, _sequelize: Sequelize) => {
    return queryInferface.dropTable("users");
  },
};
