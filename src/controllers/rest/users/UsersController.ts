import {Controller, Inject} from "@tsed/di";
import {Delete, Description, Get, Groups, Name, Post, Put, Required, Returns, Security, Summary} from "@tsed/schema";
import {UserModel} from "../../../models/users/UserModel";
import {BodyParams, PathParams} from "@tsed/platform-params";
import {ObjectID} from "@tsed/mongoose";
import {NotFound} from "@tsed/exceptions";
import {Authorize} from "@tsed/passport";
import {UsersService} from "../../../services/users/UsersService";

@Controller("/users")
@Authorize("jwt")
@Security("jwt")
@Name("Security")
export class UsersController {
  @Inject()
  protected usersService: UsersService;

  @Get("/:id")
  @Summary("Return a user")
  @Returns(200, UserModel).Groups("endpoint")
  @Returns(404)
  async get(@Required() @PathParams("id") @ObjectID() id: string) {
    const item = await this.usersService.getById(id);

    if (!item) {
      throw new NotFound("User not found");
    }

    return item;
  }


  @Post("/")
  @Summary("Create a new user")
  @Returns(201, UserModel).Groups("endpoint")
  @Returns(400)
  async post(@Required() @BodyParams() @Groups("creation") payload: UserModel) {
    return this.usersService.save(payload);
  }

  @Put("/:id")
  @Summary("Update an existing user")
  @Description("Update an existing user. If the id doesn't a 404 will be emitted.")
  @Returns(200, UserModel).Groups("endpoint")
  @Returns(400)
  @Returns(404)
  async put(@Required() @PathParams("id") id: string, @Required() @BodyParams() payload: UserModel) {
    await this.get(id);

    payload._id = id;

    return this.usersService.save(payload);
  }

  @Delete("/:id")
  @Summary("Delete an existing user")
  @Returns(204)
  @Returns(404)
  async remove(@Required() @PathParams("id") id: string) {
    await this.get(id);
    return this.usersService.removeById(id);
  }

  @Get("/")
  @Summary("Return all users")
  @Returns(200, Array).Of(UserModel).Groups("endpoint")
  list() {
    return this.usersService.getAll();
  }
}
