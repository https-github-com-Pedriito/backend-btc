import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Category, CategoryRelations, SubCategory } from '../models';
import { SubCategoryRepository } from './sub-category.repository';
export declare class CategoryRepository extends DefaultCrudRepository<Category, typeof Category.prototype.id, CategoryRelations> {
    protected subCategoryRepositoryGetter: Getter<SubCategoryRepository>;
    readonly subCategories: HasManyRepositoryFactory<SubCategory, typeof Category.prototype.id>;
    constructor(dataSource: MongodbDataSource, subCategoryRepositoryGetter: Getter<SubCategoryRepository>);
}
