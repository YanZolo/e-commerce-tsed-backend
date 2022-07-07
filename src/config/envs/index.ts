import dotenvFlow from "dotenv-flow";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const conf = dotenvFlow.config();

export const envs = {
  ...process.env,
  ...conf.parsed
};
export const isProduction = process.env.NODE_ENV === "production";
