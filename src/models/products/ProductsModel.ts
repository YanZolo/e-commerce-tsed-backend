import { Model, ObjectID, Trim } from "@tsed/mongoose";
import { CollectionOf, Default, Example, Format, Groups, MaxItems, MaxLength, MinLength, Required } from "@tsed/schema";

export class ReviewModel {
  @Required()
  @Example("Luc Skywalker")
  name: string;

  @Required()
  @MinLength(2)
  @MaxLength(250)
  @Example("Super Product !")
  comment: string;

  @Required()
  rating: number;

  @Format("date-time")
  @Default(Date.now())
  dateCreation: number = Date.now();
}

@Model({
  name: "products"
})
export class ProductsModel {
  @ObjectID("id")
  @Groups("!creation")
  _id: string;

  @Required()
  @Trim()
  @Example("Nike")
  brand: string;

  @Required()
  @Trim()
  @Example("Shirts")
  category: string;

  @Required()
  countInStock: number;

  @Format("date-time")
  @Default(Date.now())
  dateCreation: number = Date.now();

  @Trim()
  @Example("high quality product")
  description: string;

  @Required()
  @Example("/images/nike/shirts/p1.jpg")
  image: string;

  @MaxItems(20)
  @Example("/images/nike/shirts/p1.jpg")
  images: string[];

  @Required()
  @Trim()
  @Example("Nike Slim Shirt")
  name: string;

  @Required()
  numReviews: number;

  @Required()
  price: number;

  @Required()
  quantity: number;

  @Required()
  rating: number;

  @CollectionOf(ReviewModel)
  @MaxItems(20)
  @Groups("!creation")
  reviews?: ReviewModel[] = [];

  @Required()
  @Trim()
  @Example("nike-slim-shirt")
  slug: string;
}

/**
 * ## How to inject model?
 *
 * ```typescript
 * import { MongooseModel } from "@tsed/mongoose";
 * import { Injectable, Inject } from "@tsed/di";
 *
 * @Injectable()
 * class MyService {
 *   @Inject(products)
 *   model: MongooseModel<products>;
 * }
 * ```
 */
