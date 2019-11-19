import { User } from "./models";

export interface IDatabase {
  User: typeof User;
}
