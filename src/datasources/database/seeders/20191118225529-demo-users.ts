import { QueryInterface, Sequelize } from "sequelize";

module.exports = {
  up: (queryInferface: QueryInterface, _sequelize: Sequelize) => {
    const users: { first_name: string; last_name: string }[] = [
      {
        first_name: "John",
        last_name: "Doe",
      },
      {
        first_name: "Jane",
        last_name: "Doe",
      },
      {
        first_name: "Brad",
        last_name: "Smith",
      },
      {
        first_name: "Chad",
        last_name: "Johnson",
      },
      {
        first_name: "Rachel",
        last_name: "Green",
      },
    ];
    return queryInferface.bulkInsert("users", users);
  },
  down: (queryInferface: QueryInterface, _sequelize: Sequelize) => {
    return queryInferface.bulkDelete("users", {});
  },
};
