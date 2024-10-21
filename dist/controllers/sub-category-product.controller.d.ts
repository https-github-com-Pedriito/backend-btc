import { Count, Filter, Where } from '@loopback/repository';
import { SubCategory, Product } from '../models';
import { SubCategoryRepository } from '../repositories';
export declare class SubCategoryProductController {
    protected subCategoryRepository: SubCategoryRepository;
    constructor(subCategoryRepository: SubCategoryRepository);
    find(id: string, filter?: Filter<Product>): Promise<Product[]>;
    create(id: typeof SubCategory.prototype.id, product: Omit<Product, 'id'>): Promise<Product>;
    patch(id: string, product: Partial<Product>, where?: Where<Product>): Promise<Count>;
    delete(id: string, where?: Where<Product>): Promise<Count>;
}
