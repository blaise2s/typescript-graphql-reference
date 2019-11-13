import { IUserService } from "./index";
import { User } from "src/__generated__/types";
import { IDatabase } from "./database/utils/loadDatabase";
import { UserDataLoader, userLoader } from "./loaders";

export class UserService implements IUserService {
  private userLoader: UserDataLoader;

  constructor(private db: IDatabase) {
    this.userLoader = userLoader(db);
  }

  getUsers(): Promise<User[]> {
    return this.db.User.findAll();
  }

  getUser(id: number): Promise<User> {
    return this.userLoader.load(id);
  }
}
