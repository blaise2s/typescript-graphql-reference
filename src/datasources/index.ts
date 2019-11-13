import { User } from "./user";
import UserService from "./userService";
import { DataSource } from "apollo-datasource";

export interface IUserService extends DataSource {
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
}

export interface IDataSources {
  [key: string]: object;
  userService: IUserService;
}

const configureDataSources = () => {
  const dataSources: () => IDataSources = () => ({
    userService: new UserService(),
  });
  return dataSources;
};

export default configureDataSources;
