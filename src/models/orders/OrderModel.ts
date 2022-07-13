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
  _id: string;

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

  @ObjectID()  
  @Groups("!creation")
  @Required()
  userId: string;

  @Required()
  @Groups("!creation")
  @Default({})
  paymentResult: PaymentResult;

  @Required()
  @Groups("!creation")
  paidAt: string;

  @Required()
  @Default(false)
  @Groups("!creation")
  isPaid: boolean = false;

  @Required()
  @Default(false)
  @Groups("!creation")
  isDelivered: boolean = false;

  @Required()
  @Format("date-time")
  @Groups("!creation") // rajouter une valuer par défault ?
  deliveredAt: string;

  @Required()
  @Default(Date.now())
  @Groups("!creation")
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
