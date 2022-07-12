import { PlatformTest } from "@tsed/common";
import { OrdersService } from "./OrdersService";

describe("OrdersService", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<OrdersService>(OrdersService);
    // const instance = PlatformTest.invoke<OrdersService>(OrdersService); // get fresh instance

    expect(instance).toBeInstanceOf(OrdersService);
  });
});
