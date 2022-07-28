import { Model, ObjectID, Trim } from "@tsed/mongoose";
import { Default, Example, Format, Groups, Required } from "@tsed/schema";

export class OrderItems {
  @Required()
  @ObjectID()
  id: string;

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

  @ObjectID()
  @Groups("!creation")
  @Groups("!PricesInfos")
  @Required()
  product: string;
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
export class OrderModel {
  @ObjectID("id")
  @Groups("!creation")
  @Groups("!PricesInfos")
  _id: string;

  @Required()
  orderItems: OrderItems[];

  @Required()
  @Groups("!PricesInfos")
  shippingAddress: ShippingAddress;

  @Required()
  @Groups("!PricesInfos")
  paymentMethod: string;

  @Required()
  @Groups("!PricesInfos")
  itemsPrice: number;

  @Required()
  @Groups("!PricesInfos")
  shippingPrice: number;

  @Required()
  @Groups("!PricesInfos")
  taxPrice: number;

  @Required()
  @Groups("!PricesInfos")
  totalPrice: number;

  @ObjectID()
  @Groups("!creation")
  @Groups("!PricesInfos")
  @Required()
  userId: string;

  @Required()
  @Groups("!creation")
  @Groups("!PricesInfos")
  @Default({})
  paymentResult: PaymentResult;

  @Required()
  @Groups("!creation")
  @Groups("!PricesInfos")
  paidAt: string;

  @Required()
  @Default(false)
  @Groups("!creation")
  @Groups("!PricesInfos")
  isPaid: boolean = false;

  @Required()
  @Default(false)
  @Groups("!creation")
  @Groups("!PricesInfos")
  isDelivered: boolean = false;

  @Required()
  @Format("date-time")
  @Groups("!creation")
  @Groups("!PricesInfos")
  deliveredAt: string;

  @Required()
  @Default(Date.now())
  @Groups("!creation")
  @Groups("!PricesInfos")
  dateCreation: number = Date.now();
}

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
