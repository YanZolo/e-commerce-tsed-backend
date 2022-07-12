import { PlatformTest } from "@tsed/common";
import { OrdersCreationModel } from "./OrdersCreationModel";

describe("OrdersCreationModel", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<OrdersCreationModel>(OrdersCreationModel);
    // const instance = PlatformTest.invoke<OrdersCreationModel>(OrdersCreationModel); // get fresh instance

    expect(instance).toBeInstanceOf(OrdersCreationModel);
  });
});
