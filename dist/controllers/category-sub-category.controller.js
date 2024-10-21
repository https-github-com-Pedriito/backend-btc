"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySubCategoryController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CategorySubCategoryController = class CategorySubCategoryController {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async find(id, filter) {
        return this.categoryRepository.subCategories(id).find(filter);
    }
    async create(id, subCategory) {
        return this.categoryRepository.subCategories(id).create(subCategory);
    }
    async patch(id, subCategory, where) {
        return this.categoryRepository.subCategories(id).patch(subCategory, where);
    }
    async delete(id, where) {
        return this.categoryRepository.subCategories(id).delete(where);
    }
};
exports.CategorySubCategoryController = CategorySubCategoryController;
tslib_1.__decorate([
    (0, rest_1.get)('/categories/{id}/sub-categories', {
        responses: {
            '200': {
                description: 'Array of Category has many SubCategory',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.SubCategory) },
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
], CategorySubCategoryController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/categories/{id}/sub-categories', {
        responses: {
            '200': {
                description: 'Category model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.SubCategory) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.SubCategory, {
                    title: 'NewSubCategoryInCategory',
                    exclude: ['id'],
                    optional: ['categoryId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategorySubCategoryController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/categories/{id}/sub-categories', {
        responses: {
            '200': {
                description: 'Category.SubCategory PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.SubCategory, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.SubCategory))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategorySubCategoryController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/categories/{id}/sub-categories', {
        responses: {
            '200': {
                description: 'Category.SubCategory DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.SubCategory))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategorySubCategoryController.prototype, "delete", null);
exports.CategorySubCategoryController = CategorySubCategoryController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CategoryRepository])
], CategorySubCategoryController);
//# sourceMappingURL=category-sub-category.controller.js.map