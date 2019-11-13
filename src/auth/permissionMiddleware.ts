import { allow, shield } from "graphql-shield";

export const permissionMiddleware = shield({
  Query: {
    users: allow,
    user: allow,
  },
});
