import { Constant, Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import jwt from "jsonwebtoken";
import { MongooseRepository } from "../mongoose/MongooseRepository";
import { UserModel } from "../../models/users/UserModel";

@Injectable()
export class UsersService extends MongooseRepository<UserModel> {
  @Constant("passport.protocols.jwt.settings")
  private jwtSettings: any;

  @Constant("envs.ADMIN_EMAIL")
  private adminEmail: string;

  @Constant("envs.ADMIN_PASSWORD")
  private adminPassword: string;

  @Inject(UserModel)
  protected model: MongooseModel<UserModel>;

  async $onInit() {
    const result = await this.model.countDocuments();

    if (!result && this.adminEmail && this.adminPassword) {
      await this.save({
        email: String(this.adminEmail),
        password: String(this.adminPassword),
        username: "sofiane",
        isAdmin: true,
        dateCreation: Date.now()
      } as any);
    }
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  createJwt(user: UserModel) {
    const { issuer, audience, secretOrKey, maxAge = 3600 } = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: user._id,
        exp: now + maxAge * 1000,
        iat: now
      },
      secretOrKey
    );
  }

  // async login(access_token: string, user: UserModel) {
  //   if (user) {
  //     return {
  //       _id: user._id,
  //       username: user.username,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //       createdAt: user.dateCreation,
  //       token: access_token
  //     };
  //   }
  //   throw new NotFound("User not Found");
  // }
}
