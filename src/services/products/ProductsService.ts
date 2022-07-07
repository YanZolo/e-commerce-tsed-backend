import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { MongooseRepository } from "../mongoose/MongooseRepository";
import { ProductsModel } from "src/models/products/ProductsModel";
import data from "../../utils/data";

@Injectable()
export class ProductsService extends MongooseRepository<ProductsModel> {
  @Inject(ProductsModel)
  protected model: MongooseModel<ProductsModel>;

  async $onInit() {
    const result = await this.model.countDocuments();
    if (!result) {
      data.products.forEach(async (product: any) => {
        await this.save(product);
      });
    }
  }

  async findBySlug(slug: string) {
    return await this.model.findOne({ slug : slug });
  }
}
