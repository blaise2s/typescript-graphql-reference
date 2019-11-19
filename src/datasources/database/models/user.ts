import { Model, Sequelize } from "sequelize";
import { userAttrs } from "./attributes";

export class User extends Model {
  id!: number;
  firstName!: string;
  lastName!: string;
}

export const UserFactory = (sequelize: Sequelize) => {
  User.init(userAttrs, {
    sequelize,
    tableName: "users",
  });

  return User;
};
