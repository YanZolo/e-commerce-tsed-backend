import {BodyParams} from "@tsed/common";
import {OnVerify, Protocol} from "@tsed/passport";
import {IStrategyOptions, Strategy} from "passport-local";
import {Context} from "@tsed/platform-params";
import {UsersService} from "../services/users/UsersService";
import {Inject} from "@tsed/di";
import {Unauthorized} from "@tsed/exceptions";
import {Credentials} from "../models/users/UserModel";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
    session: false
  }
})
export class LoginProtocol implements OnVerify {
  @Inject()
  private usersService: UsersService;

  async $onVerify(@BodyParams() credentials: Credentials, @Context() $ctx: Context) {
    const {email, password} = credentials;
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.verifyPassword(password)) {
      throw new Unauthorized("Wrong credentials");
    }

    const token = this.usersService.createJwt(user);

    $ctx.set("user", user);
    $ctx.set("token", token);

    return token;
  }
}
