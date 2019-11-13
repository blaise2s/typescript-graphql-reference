import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
  id!: number;
  firstName!: string;
  lastName!: string;
}

export const UserFactory = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        field: "id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        field: "first_name",
        allowNull: false,
        type: DataTypes.STRING(256),
      },
      lastName: {
        field: "last_name",
        allowNull: false,
        type: DataTypes.STRING(256),
      },
    },
    {
      sequelize,
      tableName: "users",
    },
  );

  return User;
};
