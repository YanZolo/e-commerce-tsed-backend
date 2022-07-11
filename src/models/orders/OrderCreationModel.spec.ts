import { PlatformTest } from "@tsed/common";
import { OrderCreationModel } from "./OrderCreationModel";

describe("OrderCreationModel", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<OrderCreationModel>(OrderCreationModel);
    // const instance = PlatformTest.invoke<OrderCreationModel>(OrderCreationModel); // get fresh instance

    expect(instance).toBeInstanceOf(OrderCreationModel);
  });
});
