import { Entity } from '@loopback/repository';
export declare class Product extends Entity {
    name: string;
    id?: string;
    price?: number;
    imageUrl?: string;
    Description?: string;
    options?: string[];
    subCategoryId: string;
    constructor(data?: Partial<Product>);
}
export interface ProductRelations {
}
export type ProductWithRelations = Product & ProductRelations;
