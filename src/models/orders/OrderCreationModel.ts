import { Ref } from "@tsed/mongoose";
import { Required } from "@tsed/schema";
import { UserModel } from "../users/UserModel";
import { OrdersModel } from "./OrdersModel";
/**
 * ## How to inject model?
 *
 * ```typescript
 * import { MongooseModel } from "@tsed/mongoose";
 * import { Injectable, Inject } from "@tsed/di";
 *
 * @Injectable()
 * class MyService {
 *   @Inject(orderCreations)
 *   model: MongooseModel<orderCreations>;
 * }
 * ```
 */

export class OrderCreationModel extends OrdersModel {
  @Ref(UserModel)
  @Required()
  userId: Ref<UserModel>;
}
