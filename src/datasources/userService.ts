import { IUserService } from "./";
import { User, UserFilter } from "src/__generated__/types";
import { IDatabase } from "./database";
import { buildSearch } from "./database/utils";
import { UserDataLoader, userLoader } from "./loaders";
import { WhereOptions, Op } from "sequelize";

export class UserService implements IUserService {
  private userLoader: UserDataLoader;

  constructor(private db: IDatabase) {
    this.userLoader = userLoader(db);
  }

  getUsers(filter?: UserFilter): Promise<User[]> {
    const where: WhereOptions = {};
    if (filter) {
      if (filter.ids) {
        where.id = filter.ids;
      }
      if (filter.lastNameSearch) {
        where.lastName = { [Op.iLike]: buildSearch(filter.lastNameSearch) };
      }
      if (filter.fitstNameSearch) {
        where.firstName = { [Op.iLike]: buildSearch(filter.fitstNameSearch) };
      }
    }
    return this.db.User.findAll({ where });
  }

  getUser(id: number): Promise<User> {
    return this.userLoader.load(id);
  }

  addUser(firstName: string, lastName: string): Promise<User> {
    return this.db.User.create({
      firstName,
      lastName,
    });
  }
}
