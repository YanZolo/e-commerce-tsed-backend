import { PlatformTest } from "@tsed/common";
import { OrdersController } from "./OrdersController";

describe("OrdersController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<OrdersController>(OrdersController);
    // const instance = PlatformTest.invoke<OrdersController>(OrdersController); // get fresh instance

    expect(instance).toBeInstanceOf(OrdersController);
  });
});
