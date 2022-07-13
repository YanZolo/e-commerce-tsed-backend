import { PlatformTest } from "@tsed/common";
import { OrderModel } from "./OrderModel";

describe("OrderModel", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<OrderModel>(OrderModel);
    // const instance = PlatformTest.invoke<OrderModel>(OrderModel); // get fresh instance

    expect(instance).toBeInstanceOf(OrderModel);
  });
});
