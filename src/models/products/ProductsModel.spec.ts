import { PlatformTest } from "@tsed/common";
import { ProductsModel } from "./ProductsModel";

describe("ProductsModel", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<ProductsModel>(ProductsModel);
    // const instance = PlatformTest.invoke<ProductsModel>(ProductsModel); // get fresh instance

    expect(instance).toBeInstanceOf(ProductsModel);
  });
});
