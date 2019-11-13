import { QueryResolvers, MutationResolvers } from "src/__generated__/types";
import { IDataSources } from "src/datasources";

interface IResolvers<Context> {
  Query: QueryResolvers<Context>;
  Mutation: MutationResolvers<Context>;
}

const resolverMap: IResolvers<{ dataSources: IDataSources }> = {
  Query: {
    users: async (_parent, args, context) => {
      return context.dataSources.userService.getUsers(args.filter ? args.filter : undefined);
    },
    user: async (_parent, args, context) => {
      return context.dataSources.userService.getUser(args.id);
    },
  },
  Mutation: {
    addUser: async (_parent, args, context) => {
      return context.dataSources.userService.addUser(args.firstName, args.lastName);
    },
  },
};

export default resolverMap;
