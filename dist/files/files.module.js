"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const files_controller_1 = require("./files.controller");
const users_module_1 = require("../schemas/users/users.module");
const files_repository_1 = require("./files.repository");
const groups_module_1 = require("../schemas/groups/groups.module");
const s3_module_1 = require("../s3/s3.module");
const mongoose_1 = require("@nestjs/mongoose");
const files_schema_1 = require("./files.schema");
let FilesModule = exports.FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        controllers: [files_controller_1.FilesController],
        providers: [files_service_1.FilesService, files_repository_1.FilesRepository],
        imports: [
            users_module_1.UsersModule,
            groups_module_1.GroupsModule,
            s3_module_1.S3Module,
            mongoose_1.MongooseModule.forFeature([{ name: files_schema_1.File.name, schema: files_schema_1.FilesSchema }]),
        ],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map