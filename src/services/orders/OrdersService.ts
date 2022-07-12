import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { OrdersModel } from "src/models/orders/OrdersModel";
import { MongooseRepository } from "../mongoose/MongooseRepository";

@Injectable()
export class OrdersService extends MongooseRepository<OrdersModel> {
  @Inject(OrdersModel)
  protected model: MongooseModel<OrdersModel>;

//   async createOrder(order:OrderCreationModel) {
//     console.log("order ===>", order);

//     const newOrder = this.model.save(order);
//     console.log("newOrder", newOrder);
//     return newOrder;
//   }
}
