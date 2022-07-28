import { OrderItems } from "src/models/orders/OrderModel";

export function formatNumberTwoDecimal(data: OrderItems[]) {
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    data.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0)
  );

  const shippingPrice = round2(itemsPrice > 50 ? 0 : 15);
  const taxPrice = round2(itemsPrice * (19.6 / 100));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2)
  };
}
