import { Product, SubCategory } from '../models';
import { ProductRepository } from '../repositories';
export declare class ProductSubCategoryController {
    productRepository: ProductRepository;
    constructor(productRepository: ProductRepository);
    getSubCategory(id: typeof Product.prototype.id): Promise<SubCategory>;
}
