import { PlatformTest } from "@tsed/common";
import { ProductController } from "./ProductController";

describe("ProductController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<ProductController>(ProductController);
    // const instance = PlatformTest.invoke<ProductController>(ProductController); // get fresh instance

    expect(instance).toBeInstanceOf(ProductController);
  });
});
