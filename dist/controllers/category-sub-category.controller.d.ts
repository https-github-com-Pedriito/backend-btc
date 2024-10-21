import { Count, Filter, Where } from '@loopback/repository';
import { Category, SubCategory } from '../models';
import { CategoryRepository } from '../repositories';
export declare class CategorySubCategoryController {
    protected categoryRepository: CategoryRepository;
    constructor(categoryRepository: CategoryRepository);
    find(id: string, filter?: Filter<SubCategory>): Promise<SubCategory[]>;
    create(id: typeof Category.prototype.id, subCategory: Omit<SubCategory, 'id'>): Promise<SubCategory>;
    patch(id: string, subCategory: Partial<SubCategory>, where?: Where<SubCategory>): Promise<Count>;
    delete(id: string, where?: Where<SubCategory>): Promise<Count>;
}
