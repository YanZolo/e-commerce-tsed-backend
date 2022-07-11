import {Controller} from "@tsed/di";
import { Authenticate } from "@tsed/passport";
import { BodyParams, Context } from "@tsed/platform-params";
import {Get, Groups, Name, Post, Returns, Security, Summary} from "@tsed/schema";
import { OrdersModel } from "src/models/orders/OrdersModel";

@Controller("/order")
@Name("Security")
export class OrdersController {
  @Get("/")
  get() {
    return "hello";
  }
  @Post("/")
  @Authenticate("jwt", {session: false})
  @Security("jwt")
  @Summary("create a new order")
  @Returns(201, OrdersModel)
  @Returns(400)
  async post(@Context() $ctx: Context, @BodyParams() @Groups("creation") payload: OrdersModel) {
    const token = $ctx.get("decoded_token");
    const user = $ctx.get("user");
    console.log('token order post', token)
    console.log('user order post', user)
    console.log('payload order post', payload)
    return "ok"
  }
}
