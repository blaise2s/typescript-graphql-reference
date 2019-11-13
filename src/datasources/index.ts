import { UserService } from "./userService";
import { DataSource } from "apollo-datasource";
import { IDatabase } from "../datasources/database/utils/loadDatabase";
import { User } from "src/__generated__/types";

export interface IUserService extends DataSource {
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
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
