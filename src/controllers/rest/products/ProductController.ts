import { Controller, Inject } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Groups, Post, Required, Returns, Summary } from "@tsed/schema";
import { ProductsModel } from "src/models/products/ProductsModel";
import { ProductsService } from "src/services/products/ProductsService";

const IS_MONGO_ID = /^[0-9a-fA-F]{24}$/
@Controller("/products")
export class ProductController {
  @Inject(ProductsService)
  protected productsService: ProductsService;

  @Get("/:idOrSlug")
  @Summary("Return a product")
  @Returns(200, ProductsModel)
  @Returns(404)
  async getById(@Required() @PathParams("idOrSlug") idOrSlug: string) {
  
   const item = idOrSlug.match(IS_MONGO_ID) ? 
     await this.productsService.getById(idOrSlug)
    :
    await this.productsService.findBySlug(idOrSlug)    
     
    if (!item) {
      throw new NotFound("Product not found");
    }

    return item;
  }

  
  @Post("/")
  @Summary("Create a new product")
  @Returns(201, ProductsModel)
  @Returns(400)
  async post(@Required() @BodyParams() @Groups("creation") payload: ProductsModel) {
    return this.productsService.save(payload);
  }

  @Delete("/:id")
  @Summary("Delete an existing product")
  @Returns(204)
  @Returns(404)
  async remove(@Required() @PathParams("id") id: string) {
    await this.getById(id);
    return this.productsService.removeById(id);
  }

  @Get('/')
  @Summary('Return all products')
  @Returns(200, Array).Of(ProductsModel)
  list() {
    return this.productsService.getAll()
  }

}
