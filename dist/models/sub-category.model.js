"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const category_model_1 = require("./category.model");
const product_model_1 = require("./product.model");
let SubCategory = class SubCategory extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.SubCategory = SubCategory;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => category_model_1.Category),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => product_model_1.Product),
    tslib_1.__metadata("design:type", Array)
], SubCategory.prototype, "products", void 0);
exports.SubCategory = SubCategory = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], SubCategory);
//# sourceMappingURL=sub-category.model.js.map