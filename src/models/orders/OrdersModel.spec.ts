import { PlatformTest } from "@tsed/common";
import { OrdersModel } from "./OrdersModel";

describe("OrdersModel", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<OrdersModel>(OrdersModel);
    // const instance = PlatformTest.invoke<OrdersModel>(OrdersModel); // get fresh instance

    expect(instance).toBeInstanceOf(OrdersModel);
  });
});
