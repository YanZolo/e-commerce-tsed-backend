import { Controller, Inject } from "@tsed/di";
import { ObjectID } from "@tsed/mongoose";
import { Authorize } from "@tsed/passport";
import { BodyParams, Context, PathParams } from "@tsed/platform-params";
import { Get, Groups, Name, Post, Required, Returns, Security, Summary } from "@tsed/schema";
import { OrderModel } from "src/models/orders/OrderModel";
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
  @Returns(200, Array).Of(OrderModel)
  async list() {
    return this.ordersService.getAll();
  }
  @Get("/:id")
  @Summary("get order by id")
  @Returns(200, OrderModel)
  @Returns(400)
  async get(@Required() @PathParams("id") @ObjectID() id: string) {
    return this.ordersService.getById(id);
  }

  @Post("/cost")
  @Summary("get items infos for calculate prices and return it")
  @Returns(201)
  @Returns(400)
  async getInfos(
    @Required()
    @BodyParams()
    @Groups("PricesInfos")
    payload: OrderModel
  ) {
    return this.ordersService.manageOrderCost(payload);
  }
  @Post("/purchase")
  @Summary("create a new order")
  @Returns(201, OrderModel)
  @Returns(400)
  async post(@Context() $ctx: Context, @Required() @BodyParams() @Groups("creation") payload: OrderModel) {
    const user: UserModel = $ctx.get("user");
    return this.ordersService.createOrder(payload, user);
  }
}
