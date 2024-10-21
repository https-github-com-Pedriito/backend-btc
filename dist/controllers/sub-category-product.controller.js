"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryProductController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SubCategoryProductController = class SubCategoryProductController {
    constructor(subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }
    async find(id, filter) {
        return this.subCategoryRepository.products(id).find(filter);
    }
    async create(id, product) {
        return this.subCategoryRepository.products(id).create(product);
    }
    async patch(id, product, where) {
        return this.subCategoryRepository.products(id).patch(product, where);
    }
    async delete(id, where) {
        return this.subCategoryRepository.products(id).delete(where);
    }
};
exports.SubCategoryProductController = SubCategoryProductController;
tslib_1.__decorate([
    (0, rest_1.get)('/sub-categories/{id}/products', {
        responses: {
            '200': {
                description: 'Array of SubCategory has many Product',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Product) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryProductController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/sub-categories/{id}/products', {
        responses: {
            '200': {
                description: 'SubCategory model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Product) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Product, {
                    title: 'NewProductInSubCategory',
                    exclude: ['id'],
                    optional: ['subCategoryId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryProductController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/sub-categories/{id}/products', {
        responses: {
            '200': {
                description: 'SubCategory.Product PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Product, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Product))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryProductController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/sub-categories/{id}/products', {
        responses: {
            '200': {
                description: 'SubCategory.Product DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Product))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryProductController.prototype, "delete", null);
exports.SubCategoryProductController = SubCategoryProductController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SubCategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SubCategoryRepository])
], SubCategoryProductController);
//# sourceMappingURL=sub-category-product.controller.js.map