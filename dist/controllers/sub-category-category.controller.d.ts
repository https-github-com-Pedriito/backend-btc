import { SubCategory, Category } from '../models';
import { SubCategoryRepository } from '../repositories';
export declare class SubCategoryCategoryController {
    subCategoryRepository: SubCategoryRepository;
    constructor(subCategoryRepository: SubCategoryRepository);
    getCategory(id: typeof SubCategory.prototype.id): Promise<Category>;
}
