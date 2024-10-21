"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'mongodb',
    connector: 'mongodb',
    url: 'mongodb+srv://polar2510:rpJhAAe6cn1QtJMx@botaichanh.dkole.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=BOTAICHANH',
    host: '',
    user: '',
    password: '',
    database: 'sample_mflix'
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let MongodbDataSource = class MongodbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
exports.MongodbDataSource = MongodbDataSource;
MongodbDataSource.dataSourceName = 'mongodb';
MongodbDataSource.defaultConfig = config;
exports.MongodbDataSource = MongodbDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.mongodb', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MongodbDataSource);
//# sourceMappingURL=mongodb.datasource.js.map