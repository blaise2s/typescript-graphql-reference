import { IUserService } from "./index";
import { User } from "src/__generated__/types";

class UserService implements IUserService {
  // TODO
  blaise: User = {
    id: "1",
    firstName: "Blaise",
    lastName: "Schaeffer",
  };

  getUsers(): Promise<User[]> {
    const users: User[] = [];
    users.push(this.blaise);
    return Promise.resolve(users);
  }
  getUser(id: string): Promise<User> {
    return Promise.resolve(this.blaise);
  }
}

export default UserService;
