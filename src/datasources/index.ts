import { UserService } from "./userService";
import { DataSource } from "apollo-datasource";
import { User, UserFilter } from "src/__generated__/types";
import { IDatabase } from "./database";

export interface IUserService extends DataSource {
  getUsers(filter?: UserFilter): Promise<User[]>;
  getUser(id: number): Promise<User>;
  addUser(firstName: string, lastName: string): Promise<User>;
}

export interface IDataSources {
  [key: string]: object;
  userService: IUserService;
}

export const configureDataSources = (db: IDatabase) => {
  const dataSources: () => IDataSources = () => ({
    userService: new UserService(db),
  });
  return dataSources;
};

export * from "./userService";
