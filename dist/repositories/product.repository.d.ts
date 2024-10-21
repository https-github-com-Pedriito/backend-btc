import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Product, ProductRelations, SubCategory } from '../models';
import { SubCategoryRepository } from './sub-category.repository';
export declare class ProductRepository extends DefaultCrudRepository<Product, typeof Product.prototype.id, ProductRelations> {
    protected subCategoryRepositoryGetter: Getter<SubCategoryRepository>;
    readonly subCategory: BelongsToAccessor<SubCategory, typeof Product.prototype.id>;
    constructor(dataSource: MongodbDataSource, subCategoryRepositoryGetter: Getter<SubCategoryRepository>);
}
