"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSubCategoryController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ProductSubCategoryController = class ProductSubCategoryController {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getSubCategory(id) {
        return this.productRepository.subCategory(id);
    }
};
exports.ProductSubCategoryController = ProductSubCategoryController;
tslib_1.__decorate([
    (0, rest_1.get)('/products/{id}/sub-category', {
        responses: {
            '200': {
                description: 'SubCategory belonging to Product',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.SubCategory),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductSubCategoryController.prototype, "getSubCategory", null);
exports.ProductSubCategoryController = ProductSubCategoryController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ProductRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProductRepository])
], ProductSubCategoryController);
//# sourceMappingURL=product-sub-category.controller.js.map