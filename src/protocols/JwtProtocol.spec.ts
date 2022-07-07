import { PlatformTest } from "@tsed/common";
import { JwtProtocol } from "./JwtProtocol";

describe("JwtProtocol", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<JwtProtocol>(JwtProtocol);
    // const instance = PlatformTest.invoke<JwtProtocol>(JwtProtocol); // get fresh instance

    expect(instance).toBeInstanceOf(JwtProtocol);
  });
});
