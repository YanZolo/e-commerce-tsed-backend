import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Default, Format, Groups, Required } from "@tsed/schema";
import { UserModel } from "../users/UserModel";
import { OrderItems, ShippingAddress } from "./OrdersModel";
/**
 * ## How to inject model?
 *
 * ```typescript
 * import { MongooseModel } from "@tsed/mongoose";
 * import { Injectable, Inject } from "@tsed/di";
 *
 * @Injectable()
 * class MyService {
 *   @Inject(ordersCreations)
 *   model: MongooseModel<ordersCreations>;
 * }
 * ```
 */

 @Model({
  name: "orders"
})
export class OrdersCreationModel {
  @ObjectID("id")
  @Groups("!creation")
  _id?: string;  // obliger de mettre le "?" sinon le champ "id" est requis malgré le @Groupe(!creation)

  @Required()
  orderItems: OrderItems[];

  @Required()
  shippingAddress: ShippingAddress;

  @Required()
  paymentMethod: string;

  @Required()
  itemsPrice: number;

  @Required()
  shippingPrice: number;

  @Required()
  taxPrice: number;

  @Required()
  totalPrice: number;

  @Ref(UserModel)
  @Groups("creation")
  userId: Ref<UserModel>;

  @Format("date-time")
  @Default(Date.now())
  dateCreation?: number = Date.now();
}
