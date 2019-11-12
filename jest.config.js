/**
 * By default Jest testing framework does not have typescript support, transform uses ts-jest package to compile ts and tsx files
 * @see {@link https://basarat.gitbooks.io/typescript/docs/testing/jest.html} for further information.
 */
module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
