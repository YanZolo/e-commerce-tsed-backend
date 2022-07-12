import { Model, Ref, Trim } from "@tsed/mongoose";
import { Default, Example, Groups, Property, Required } from "@tsed/schema";
import { ProductsModel } from "../products/ProductsModel";
import { OrdersCreationModel } from "./OrdersCreationModel";
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

export class OrderItems {
  @Required()
  @Trim()
  @Example("nike-slim-shirt")
  slug: string;

  @Required()
  @Trim()
  @Example("Nike Slim Shirt")
  name: string;

  @Required()
  quantity: number;

  @Required()
  @Example("/images/nike/shirts/p1.jpg")
  image: string;

  @Required()
  price: number;

  @Ref(ProductsModel)
  @Groups("creation")
  product: Ref<ProductsModel>;
}

export class ShippingAddress {
  @Required()
  fullName: string;

  @Required()
  address: string;

  @Required()
  city: string;

  @Required()
  postalCode: string;

  @Required()
  country: string;
}

export class PaymentResult {
  @Required()
  id: string;

  @Required()
  status: string;

  @Required()
  update_time: string;

  @Required()
  email_address: string;
}

@Model({
  name: "orders"
})
export class OrdersModel extends OrdersCreationModel {

  @Property()
  paymentResult?: PaymentResult;

  @Property()
  @Default(false)
  isPaid?: boolean;

  @Property()
  paidAt?: Date;

  @Property()
  @Default(false)
  isDelivered?: boolean;

  @Property()
  deliveredAt?: Date;
 
}
