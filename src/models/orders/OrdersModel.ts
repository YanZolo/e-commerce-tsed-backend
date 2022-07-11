import { Model, ObjectID, Ref, Trim, Unique } from "@tsed/mongoose";
import { Default, Description, Example, Format, Groups, Property, Required } from "@tsed/schema";
import { ProductsModel } from "../products/ProductsModel";
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
  @Unique()
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
  @Description("product ID")
  @Required()
  productId: Ref<ProductsModel>;
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
export class OrdersModel {
  @ObjectID("id")
  @Groups("!creation")
  _id: string;

  @Required()
  orderItems: OrderItems[];

  @Required()
  shippingAddress: ShippingAddress;

  @Required()
  paymentMethod: string;

  @Property()
  paymentResult: PaymentResult;

  @Required()
  itemsPrice: number;

  @Required()
  shippingPrice: number;

  @Required()
  taxPrice: number;

  @Required()
  totalPrice: number;

  @Property()
  @Default(false)
  isPaid: boolean;

  @Property()
  paidAt: Date;

  @Property()
  @Default(false)
  isDelivered: boolean;

  @Property()
  deliveredAt: Date;

  @Format("date-time")
  @Default(Date.now())
  dateCreation: number = Date.now();
}
