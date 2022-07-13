import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { OrderItems, OrdersModel, ShippingAddress } from "src/models/orders/OrdersModel";
import { UserModel } from "src/models/users/UserModel";

import { MongooseRepository } from "../mongoose/MongooseRepository";

export type Item = {
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
  quantity: number;
};
export type PayloadCreation = {
  orderItems: Item[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  shippingPrice: number;
  taxPrice: number;
  itemsPrice: number;
  totalPrice: number;
};
@Injectable()
export class OrdersService extends MongooseRepository<OrdersModel> {
  @Inject(OrdersModel)
  protected model: MongooseModel<OrdersModel>;

  async createOrder(payload: PayloadCreation, user: UserModel) {
    console.log("payload ===>", payload);

    const orderItems: OrderItems[] = payload.orderItems.map((item: Item) => {
      return {
        slug: item.slug,
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        product: item.id
      };
    });

    const { shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = payload;

    const order: OrdersModel = {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      userId: user._id,
      isPaid: false,
      isDelivered: false,
      dateCreation: Date.now()
    };

    console.log("order === >", order);

    return this.save(order);
  }
}
