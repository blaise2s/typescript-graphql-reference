import fs from "fs";
import inquirer from "inquirer";
import path from "path";

/**
 * Interactive script to create/update .env file for local development
 * Will load existing values from .env and use them as defaults
 */

// only these keys will be present in final .env file
const validKeys = ["NODE_ENV", "LOG_LEVEL", "PORT"];

interface IAnswers {
  envFilename: string;
  NODE_ENV: string;
  LOG_LEVEL: string;
  PORT: number;
}

const promptConfig = [
  {
    type: "input",
    message: ".env filename:",
    name: "envFilename",
    default: ".env",
  },
  {
    type: "input",
    message: "Node environment:",
    name: "NODE_ENV",
    default: "dev",
  },
  {
    type: "input",
    message: "Log level:",
    name: "LOG_LEVEL",
    default: "debug",
  },
  {
    type: "number",
    message: "Service port:",
    name: "PORT",
    default: 4005,
  },
];

void (async () => {
  const answers = await inquirer.prompt(promptConfig);
  //@ts-ignore
  const envPath = path.join(__dirname, "..", answers.envFilename);

  const envBody = Object.keys(answers)
    .filter((key) => validKeys.includes(key))
    .map((key) => `${key}=${answers[key]}`)
    .join("\n");
  fs.writeFileSync(envPath, envBody, "utf-8");
})();
