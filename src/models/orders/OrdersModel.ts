import { Model, ObjectID } from "@tsed/mongoose";
/**
 * ## How to inject model?
 *
 * ```typescript
 * import { MongooseModel } from "@tsed/mongoose";
 * import { Injectable, Inject } from "@tsed/di";
 *
 * @Injectable()
 * class MyService {
 *   @Inject(orders)
 *   model: MongooseModel<orders>;
 * }
 * ```
 */
@Model({
  name: "orders"
})
export class OrdersModel {
  @ObjectID("id")
  _id: string;

  
}
