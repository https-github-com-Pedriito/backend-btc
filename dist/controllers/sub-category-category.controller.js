"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryCategoryController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SubCategoryCategoryController = class SubCategoryCategoryController {
    constructor(subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }
    async getCategory(id) {
        return this.subCategoryRepository.category(id);
    }
};
exports.SubCategoryCategoryController = SubCategoryCategoryController;
tslib_1.__decorate([
    (0, rest_1.get)('/sub-categories/{id}/category', {
        responses: {
            '200': {
                description: 'Category belonging to SubCategory',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Category),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryCategoryController.prototype, "getCategory", null);
exports.SubCategoryCategoryController = SubCategoryCategoryController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SubCategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SubCategoryRepository])
], SubCategoryCategoryController);
//# sourceMappingURL=sub-category-category.controller.js.map