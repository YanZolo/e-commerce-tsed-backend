import { PlatformTest } from "@tsed/common";
import { ProductsService } from "./ProductsService";

describe("ProductsService", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<ProductsService>(ProductsService);
    // const instance = PlatformTest.invoke<ProductsService>(ProductsService); // get fresh instance

    expect(instance).toBeInstanceOf(ProductsService);
  });
});
