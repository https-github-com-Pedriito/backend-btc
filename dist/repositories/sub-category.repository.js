"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let SubCategoryRepository = class SubCategoryRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, categoryRepositoryGetter, productRepositoryGetter) {
        super(models_1.SubCategory, dataSource);
        this.categoryRepositoryGetter = categoryRepositoryGetter;
        this.productRepositoryGetter = productRepositoryGetter;
        this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter);
        this.registerInclusionResolver('products', this.products.inclusionResolver);
        this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter);
        this.registerInclusionResolver('category', this.category.inclusionResolver);
    }
};
exports.SubCategoryRepository = SubCategoryRepository;
exports.SubCategoryRepository = SubCategoryRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongodb')),
    tslib_1.__param(1, repository_1.repository.getter('CategoryRepository')),
    tslib_1.__param(2, repository_1.repository.getter('ProductRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongodbDataSource, Function, Function])
], SubCategoryRepository);
//# sourceMappingURL=sub-category.repository.js.map