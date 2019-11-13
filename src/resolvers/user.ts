import { QueryResolvers } from "src/__generated__/types";
import { IDataSources } from "src/datasources";

interface IResolvers<Context> {
  Query: QueryResolvers<Context>;
}

const resolverMap: IResolvers<{ dataSources: IDataSources }> = {
  Query: {
    users: async (_parent, _args, context) => {
      return context.dataSources.userService.getUsers();
    },
    user: async (_parent, args, context) => {
      return context.dataSources.userService.getUser(args.id);
    },
  },
};

export default resolverMap;
