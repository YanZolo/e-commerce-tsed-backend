import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { OrdersController } from "./OrdersController";
import { Server } from "../../../Server";

describe("OrdersController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server, {
    mount: {
      "/": [OrdersController]
    }
  }));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should call GET /order", async () => {
     const response = await request.get("/order").expect(200);

     expect(response.text).toEqual("hello");
  });
});
