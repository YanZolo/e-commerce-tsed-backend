import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { OrderModel, ShippingAddress } from "src/models/orders/OrderModel";
import { UserModel } from "src/models/users/UserModel";
import { formatNumberTwoDecimal } from "src/utils/formatNumber";

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
export class OrdersService extends MongooseRepository<OrderModel> {
  @Inject(OrderModel)
  protected model: MongooseModel<OrderModel>;

  async manageOrderCost(payload: OrderModel) {
    const result = formatNumberTwoDecimal(payload.orderItems);
    console.log("result", result);
    return { orderCost: result };
  }

  async createOrder(payload: OrderModel, user: UserModel) {
    const orderItems = payload.orderItems.map((item) => {
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

    return this.save({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      userId: user._id
    } as OrderModel);
  }
}
