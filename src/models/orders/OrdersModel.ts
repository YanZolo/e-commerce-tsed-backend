import { Model, ObjectID, Ref, Trim } from "@tsed/mongoose";
import { Default, Example, Format, Groups, Property, Required } from "@tsed/schema";
import { ProductsModel } from "../products/ProductsModel";
import { UserModel } from "../users/UserModel";


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
  @Property()
  id: string;

  @Property()
  status: string;

  @Property()
  update_time: string;

  @Property()
  email_address: string;
}

@Model({
  name: "orders"
})
export class OrdersModel {
  @ObjectID("id")
  @Groups("!creation")
  _id?: string;

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

  @Property()
  paymentResult?: PaymentResult;

  @Property()
  @Default(false)
  isPaid: boolean = false;

  @Property()
  paidAt?: Date;

  @Property()
  @Default(false)
  isDelivered: boolean = false;

  @Property()
  deliveredAt?: Date;

  @Format("date-time")
  @Default(Date.now())
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