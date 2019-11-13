import { IUserService } from "./index";
import { User } from "src/__generated__/types";
import { IDatabase } from "./database/utils/loadDatabase";

export class UserService implements IUserService {
  constructor(private db: IDatabase) {}

  getUsers(): Promise<User[]> {
    return this.db.User.findAll();
  }

  getUser(id: string): Promise<User> {
    return this.db.User.findByPk(id);
  }
}
