import { User } from "./user";

export interface IDatabase {
  User: typeof User;
}

export * from "./user";
