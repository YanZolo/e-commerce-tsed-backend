import { Controller, Inject } from "@tsed/di";
import { Get, Name, Post, Returns, Security } from "@tsed/schema";
import { Authenticate } from "@tsed/passport";
import { BodyParams, Context } from "@tsed/platform-params";
import { Credentials, UserModel } from "../../../models/users/UserModel";
import { UsersService } from "src/services/users/UsersService";
import { NotFound } from "@tsed/exceptions";

@Controller("/auth")
@Name("Security")
export class AuthController {
  @Inject()
  protected usersService: UsersService;

  @Post("/login")
  @Authenticate("login", { session: false })
  // @Returns(200).Schema(object({access_token: string().required()}))
  @Returns(200)
  @Returns(401)
  @Returns(400)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Context() $ctx: Context, @BodyParams() credentials: Credentials) {
    const token = $ctx.get("token");
    const user = $ctx.get("user");
    if (user) {
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: new Date(user.dateCreation).toUTCString() ,
        token
      };
    }
    throw new NotFound("User not Found");
  }

  @Get("/userinfo")
  @Authenticate("jwt", { session: false })
  @Security("jwt")
  @Returns(200, UserModel).Groups("endpoint")
  @Returns(401)
  @Returns(400)
  userinfo(@Context() $ctx: Context) {
    // FACADE
    return $ctx.get("user");
  }
}
