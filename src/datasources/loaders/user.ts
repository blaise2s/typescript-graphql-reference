import { IDatabase } from "../database/utils/loadDatabase";
import { User } from "src/__generated__/types";
import DataLoader from "dataloader";

export type UserBatch = (ids: number[]) => Promise<User[]>;
export type UserDataLoader = ReturnType<typeof userLoader>;

const fetchUsers = async (db: IDatabase, ids: number[]) => {
  const users: User[] = await db.User.findAll({
    where: {
      id: ids,
    },
  });

  const userMap: { [key: number]: User } = {};
  users.forEach((user: User) => {
    userMap[user.id] = user;
  });

  return ids.map((id) => userMap[id]);
};

export const userLoader = (db: IDatabase, batchLoadFn?: UserBatch) => {
  if (batchLoadFn) {
    return new DataLoader<number, User>(batchLoadFn);
  }
  return new DataLoader<number, User>((ids) => {
    return fetchUsers(db, ids);
  });
};
