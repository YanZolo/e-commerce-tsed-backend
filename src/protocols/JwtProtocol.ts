import {Arg, OnVerify, Protocol} from "@tsed/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {UsersService} from "../services/users/UsersService";
import {Inject} from "@tsed/di";
import {Context} from "@tsed/platform-params";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }
})
export class JwtProtocol implements OnVerify {
  @Inject()
  protected usersService: UsersService;

  async $onVerify(@Arg(0) jwtPayload: any, @Context() $ctx: Context) {
    const user = await this.usersService.getById(jwtPayload.sub);

    $ctx.set("user", user);
    $ctx.set("decoded_token", jwtPayload);

    return user ? user : false;
  }
}
