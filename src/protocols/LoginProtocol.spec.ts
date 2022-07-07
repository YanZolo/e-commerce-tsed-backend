import { PlatformTest } from "@tsed/common";
import { LoginProtocol } from "./LoginProtocol";

describe("LoginProtocol", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<LoginProtocol>(LoginProtocol);
    // const instance = PlatformTest.invoke<LoginProtocol>(LoginProtocol); // get fresh instance

    expect(instance).toBeInstanceOf(LoginProtocol);
  });
});
