# Typescript GraphQL Reference Project

Update the readme to reflect how to get started with your project

## Initial Setup & Configuration

- Install dependencies: `npm install`

- Create and configure the lcoal development environment (`.env` file): `npm run gen:env`. **Note:** Most of the environment coniguration sets variables for connecting to a remote DB. If you don't have one, select the defaults and continue to [offline development](#offline-development) below

- Start the server: `npm run dev`

### Offline development

If you don't have a remote DB or you're in a situation where you don't have access to the Internet, you can still work offline. **However**, you should initialize the offline work environment while connected to the Internet. The first time `docker-compose` runs it will download the necessary software.

- Verify that [`docker`](https://docs.docker.com/install/) and [`docker-compose`](https://docs.docker.com/compose/install/) are installed.

- Start configured services: `docker-compose up -d`

- Initialize the database: `npm run db:init:local`

  - Builds project as `sequelize` expects `js` files
  - Runs `db:migrate` to create tables
  - Runs `db:seed:all` to add the mock data to the DB

- Set the `OFFLINE_LOCAL` environment variable to `true` in the `.env` file

* Start the server: `npm run dev`

* When finished, stop configured sercives: `docker-compose down`

**Note:** To use a remote DB again simply set the `OFFLINE_LOCAL` environment variable to `false` in the `.env` file.
