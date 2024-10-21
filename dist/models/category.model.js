"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const sub_category_model_1 = require("./sub-category.model");
let Category = class Category extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Category = Category;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "Name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => sub_category_model_1.SubCategory),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "subCategories", void 0);
exports.Category = Category = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Category);
//# sourceMappingURL=category.model.js.map