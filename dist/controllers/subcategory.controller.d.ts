import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { SubCategory } from '../models';
import { SubCategoryRepository } from '../repositories';
export declare class SubcategoryController {
    subCategoryRepository: SubCategoryRepository;
    constructor(subCategoryRepository: SubCategoryRepository);
    create(subCategory: Omit<SubCategory, 'id'>): Promise<SubCategory>;
    count(where?: Where<SubCategory>): Promise<Count>;
    find(filter?: Filter<SubCategory>): Promise<SubCategory[]>;
    updateAll(subCategory: SubCategory, where?: Where<SubCategory>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<SubCategory>): Promise<SubCategory>;
    updateById(id: string, subCategory: SubCategory): Promise<void>;
    replaceById(id: string, subCategory: SubCategory): Promise<void>;
    deleteById(id: string): Promise<void>;
}
