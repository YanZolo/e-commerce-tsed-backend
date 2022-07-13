import { Controller, Inject } from "@tsed/di";
import { ObjectID } from "@tsed/mongoose";
import { Authorize } from "@tsed/passport";
import { BodyParams, Context, PathParams } from "@tsed/platform-params";
import { Get, Groups, Name, Post, Required, Returns, Security, Summary } from "@tsed/schema";
import { OrdersModel } from "src/models/orders/OrdersModel";
import { UserModel } from "src/models/users/UserModel";
import { OrdersService } from "src/services/orders/OrdersService";

@Controller("/order")
@Authorize("jwt")
@Security("jwt")
@Name("Security")
export class OrdersController {
  @Inject()
  protected ordersService: OrdersService;

  @Get("/")
  @Summary("get all orders")
  @Returns(200, Array).Of(OrdersModel)
  async list() {
    return this.ordersService.getAll();
  }
  @Get("/:id")
  @Summary("get order by id")
  @Returns(200, OrdersModel)
  @Returns(400)
  async get(@Required() @PathParams("id") @ObjectID() id: string) {
    return this.ordersService.getById(id);
  }

  @Post("/")
  @Summary("create a new order")
  @Returns(201, OrdersModel)
  @Returns(400)
  async post(@Context() $ctx: Context, @Required() @BodyParams() @Groups("creation") payload: any) {
    const user: UserModel = $ctx.get("user");
    return this.ordersService.createOrder(payload, user);
  }
}
