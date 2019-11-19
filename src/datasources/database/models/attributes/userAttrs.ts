import { DataTypes, ModelAttributes } from "sequelize";

// NOTE: When creating new attribute versions it's crucial to export the new version as seen
// below so it's picked up by the model class. Additionaly, make sure you reference the new
// version in the corresponding migration file when updating the database.
export const userAttrsV1: ModelAttributes = {
  id: {
    field: "id",
    primaryKey: true,
    autoIncrement: true,
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
};

export { userAttrsV1 as userAttrs };
