import { Model, ObjectID, Trim, Unique } from "@tsed/mongoose";
import { Default, Email, Example, Format, Groups, MaxLength, MinLength, Required } from "@tsed/schema";
import bcrypt from "bcryptjs";
export class Credentials {
  @Email()
  @Required()
  @Unique()
  email: string;

  @Required()
  @MinLength(4)
  @MaxLength(100)
  @Groups("!endpoint")
  password: string;
}
@Model({
  name: "users"
})
export class UserModel extends Credentials {
  @ObjectID("id")
  @Groups("!creation")
  _id: string;

  @Required()
  @MinLength(2)
  @MaxLength(100)
  @Trim()
  @Example("John")
  username: string;

  @Required()
  @Default(false)
  isAdmin: boolean;

  @Format("date-time")
  @Default(Date.now())
  dateCreation: number = Date.now();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verifyPassword(password: string): boolean {
    const decodedPassword = bcrypt.compareSync(password, this.password);
    console.log('decodedPassword model ===>', decodedPassword)
    return decodedPassword;
  }
}
