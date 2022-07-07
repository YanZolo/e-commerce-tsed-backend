import {readFileSync} from "fs";
import {envs} from "./envs";
import loggerConfig from "./logger";
import mongooseConfig from "./mongoose";
import {UserModel} from "../models/users/UserModel";

const pkg = JSON.parse(readFileSync("./package.json", {encoding: "utf8"}));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  mongoose: mongooseConfig,
  passport: {
    disableSession: true,
    userInfoModel: UserModel,
    protocols: {
      jwt: {
        settings: {
          secretOrKey: "myhugesecret",
          issuer: "accounts.tsed.com",
          audience: "tsed.com"
        }
      }
    }
  }
  // additional shared configuration
};
