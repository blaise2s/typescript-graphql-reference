import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { permissionMiddleware } from "./auth/permissionMiddleware";
import compression from "compression";
import { configureDataSources } from "./datasources";
import express from "express";
import { applyMiddleware } from "graphql-middleware";
import morgan from "morgan";
import { resolvers } from "./resolvers";
import { loadSchema } from "./schema/loadSchema";
import { loadConfig } from "./utils/config";
import { logger } from "./utils/logger";

const env = process.env.NODE_ENV || "production";
const config = loadConfig(env);
const typeDefs = loadSchema();
const dataSources = configureDataSources();

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: true,
    },
  }),
  permissionMiddleware,
);

const server = new ApolloServer({
  schema,
  dataSources,
  tracing: process.env.NODE_ENV === "development",
});

const app = express();

app.use(
  morgan("dev", {
    skip: (req, res) => {
      return (
        req.url === "/.well-known/apollo/server-health" ||
        req.url === "/favicon.ico" ||
        req.originalUrl === "/.well-known/apollo/server-health" ||
        req.originalUrl === "/favicon.ico" ||
        res.statusCode < 400
      );
    },
    stream: process.stderr,
  }),
);

app.use(
  morgan("dev", {
    skip: (req, res) => {
      return (
        req.url === "/.well-known/apollo/server-health" ||
        req.url === "/favicon.ico" ||
        req.originalUrl === "/.well-known/apollo/server-health" ||
        req.originalUrl === "/favicon.ico" ||
        res.statusCode >= 400
      );
    },
    stream: process.stdout,
  }),
);

app.use(compression());
server.applyMiddleware({ app });
app.listen({ port: config.port }, () => logger.info(`🚀 Server listening on ${config.port}, env: ${env}.`));
