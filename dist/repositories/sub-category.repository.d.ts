import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { SubCategory, SubCategoryRelations, Category, Product } from '../models';
import { CategoryRepository } from './category.repository';
import { ProductRepository } from './product.repository';
export declare class SubCategoryRepository extends DefaultCrudRepository<SubCategory, typeof SubCategory.prototype.id, SubCategoryRelations> {
    protected categoryRepositoryGetter: Getter<CategoryRepository>;
    protected productRepositoryGetter: Getter<ProductRepository>;
    readonly category: BelongsToAccessor<Category, typeof SubCategory.prototype.id>;
    readonly products: HasManyRepositoryFactory<Product, typeof SubCategory.prototype.id>;
    constructor(dataSource: MongodbDataSource, categoryRepositoryGetter: Getter<CategoryRepository>, productRepositoryGetter: Getter<ProductRepository>);
}
