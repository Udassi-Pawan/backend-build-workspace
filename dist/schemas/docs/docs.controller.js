"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsController = void 0;
const common_1 = require("@nestjs/common");
const docs_service_1 = require("./docs.service");
const mongoose_1 = require("mongoose");
let DocsController = exports.DocsController = class DocsController {
    constructor(docsService) {
        this.docsService = docsService;
    }
    async updateDoc(text, docId) {
        const doc = await this.docsService.findDoc(docId);
        console.log('requested doc', doc);
        if (doc) {
            return this.docsService.updateDoc(docId, text);
        }
        else
            return 'doc does not exist';
    }
    async createDoc(groupId, name) {
        return this.docsService.createDoc(groupId, name);
    }
    async getSingleDoc(docId) {
        console.log('reqdoc', docId, await this.docsService.findDoc(docId));
        return await this.docsService.findDoc(docId);
    }
};
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)('text')),
    __param(1, (0, common_1.Body)('docId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.default.Schema.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], DocsController.prototype, "updateDoc", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)('groupId')),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Schema.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], DocsController.prototype, "createDoc", null);
__decorate([
    (0, common_1.Get)('single/:docId'),
    __param(0, (0, common_1.Param)('docId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Schema.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], DocsController.prototype, "getSingleDoc", null);
exports.DocsController = DocsController = __decorate([
    (0, common_1.Controller)('doc'),
    __metadata("design:paramtypes", [docs_service_1.DocsService])
], DocsController);
//# sourceMappingURL=docs.controller.js.map