import { Entity } from '@loopback/repository';
import { SubCategory } from './sub-category.model';
export declare class Category extends Entity {
    Name: string;
    id?: string;
    subCategories: SubCategory[];
    constructor(data?: Partial<Category>);
}
export interface CategoryRelations {
}
export type CategoryWithRelations = Category & CategoryRelations;
