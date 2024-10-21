"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SubcategoryController = class SubcategoryController {
    constructor(subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }
    async create(subCategory) {
        return this.subCategoryRepository.create(subCategory);
    }
    async count(where) {
        return this.subCategoryRepository.count(where);
    }
    async find(filter) {
        return this.subCategoryRepository.find(filter);
    }
    async updateAll(subCategory, where) {
        return this.subCategoryRepository.updateAll(subCategory, where);
    }
    async findById(id, filter) {
        return this.subCategoryRepository.findById(id, filter);
    }
    async updateById(id, subCategory) {
        await this.subCategoryRepository.updateById(id, subCategory);
    }
    async replaceById(id, subCategory) {
        await this.subCategoryRepository.replaceById(id, subCategory);
    }
    async deleteById(id) {
        await this.subCategoryRepository.deleteById(id);
    }
};
exports.SubcategoryController = SubcategoryController;
tslib_1.__decorate([
    (0, rest_1.post)('/sub-categories'),
    (0, rest_1.response)(200, {
        description: 'SubCategory model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.SubCategory) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.SubCategory, {
                    title: 'NewSubCategory',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubcategoryController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/sub-categories/count'),
    (0, rest_1.response)(200, {
        description: 'SubCategory model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.SubCategory)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubcategoryController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/sub-categories'),
    (0, rest_1.response)(200, {
        description: 'Array of SubCategory model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.SubCategory, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.SubCategory)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubcategoryController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/sub-categories'),
    (0, rest_1.response)(200, {
        description: 'SubCategory PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.SubCategory, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.SubCategory)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.SubCategory, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubcategoryController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/sub-categories/{id}'),
    (0, rest_1.response)(200, {
        description: 'SubCategory model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.SubCategory, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.SubCategory, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubcategoryController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/sub-categories/{id}'),
    (0, rest_1.response)(204, {
        description: 'SubCategory PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.SubCategory, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.SubCategory]),
    tslib_1.__metadata("design:returntype", Promise)
], SubcategoryController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/sub-categories/{id}'),
    (0, rest_1.response)(204, {
        description: 'SubCategory PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.SubCategory]),
    tslib_1.__metadata("design:returntype", Promise)
], SubcategoryController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/sub-categories/{id}'),
    (0, rest_1.response)(204, {
        description: 'SubCategory DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SubcategoryController.prototype, "deleteById", null);
exports.SubcategoryController = SubcategoryController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SubCategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SubCategoryRepository])
], SubcategoryController);
//# sourceMappingURL=subcategory.controller.js.map