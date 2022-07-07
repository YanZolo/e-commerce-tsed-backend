import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { ProductController } from "./ProductController";
import { Server } from "../../../Server";

describe("ProductController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server, {
    mount: {
      "/": [ProductController]
    }
  }));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should call GET /product", async () => {
     const response = await request.get("/product").expect(200);

     expect(response.text).toEqual("hello");
  });
});
