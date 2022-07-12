import { Controller, Inject } from "@tsed/di";
import { ObjectID } from "@tsed/mongoose";
import { Authorize } from "@tsed/passport";
import { BodyParams, Context, PathParams } from "@tsed/platform-params";
import { Get, Groups, Name, Post, Required, Returns, Security, Summary } from "@tsed/schema";
import { OrderItems, OrdersModel } from "src/models/orders/OrdersModel";
import { UserModel } from "src/models/users/UserModel";
import { OrdersService } from "src/services/orders/OrdersService";

interface Item {
  id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: string[] | [];
  dateCreation: number;
  quantity: number
}

@Controller("/order")
@Authorize("jwt")
@Security("jwt")
@Name("Security")
export class OrdersController {
  @Inject()
  protected ordersService: OrdersService;

  @Get('/')
  @Summary("get all orders")
  @Returns(200, Array).Of(OrdersModel)
  async list(){
    return this.ordersService.getAll()
  }
  @Get('/:id')
  @Summary("get order by id")
  @Returns(200, OrdersModel)
  @Returns(400)
  async get(@Required() @PathParams("id") @ObjectID() id: string){
    return this.ordersService.getById(id)
  }

  @Post("/") 
  @Summary("create a new order")
  @Returns(201, OrdersModel)
  @Returns(400)
  async post(@Context() $ctx: Context,@Required() @Groups("creation") @BodyParams()  payload: any) {
    const user : UserModel = $ctx.get("user");


    const orderItems : OrderItems[] = payload.orderItems.map((item : Item) => {
      return {
        slug: item.slug,
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        product: item.id,
      };
    });

    const { shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, dateCreation } = payload;
 

    const order : any = {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      userId: user._id,
      dateCreation
    };

    console.log('order === >', order)

    return this.ordersService.save(order);
  }
}
