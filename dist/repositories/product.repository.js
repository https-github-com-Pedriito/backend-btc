"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ProductRepository = class ProductRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, subCategoryRepositoryGetter) {
        super(models_1.Product, dataSource);
        this.subCategoryRepositoryGetter = subCategoryRepositoryGetter;
        this.subCategory = this.createBelongsToAccessorFor('subCategory', subCategoryRepositoryGetter);
        this.registerInclusionResolver('subCategory', this.subCategory.inclusionResolver);
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongodb')),
    tslib_1.__param(1, repository_1.repository.getter('SubCategoryRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongodbDataSource, Function])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map