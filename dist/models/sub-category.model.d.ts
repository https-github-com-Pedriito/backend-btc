import { Entity } from '@loopback/repository';
import { Product } from './product.model';
export declare class SubCategory extends Entity {
    name: string;
    id?: string;
    categoryId: string;
    products: Product[];
    constructor(data?: Partial<SubCategory>);
}
export interface SubCategoryRelations {
}
export type SubCategoryWithRelations = SubCategory & SubCategoryRelations;
