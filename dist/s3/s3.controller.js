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
exports.S3Controller = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("./s3.service");
const crypto_1 = require("crypto");
let S3Controller = exports.S3Controller = class S3Controller {
    constructor(s3service) {
        this.s3service = s3service;
    }
    downloadFile(filename, originalFilename) {
        return this.s3service.getPresignedDownloadUrl(filename, originalFilename);
    }
    async uploadFile(filetype) {
        const videoId = (0, crypto_1.randomUUID)();
        const { uploadUrl } = await this.s3service.getPresignedUploadUrl(filetype, videoId);
        const ex = filetype.split('/')[1];
        return { uploadUrl, videoId: videoId + '.' + ex };
    }
};
__decorate([
    (0, common_1.Get)('download'),
    __param(0, (0, common_1.Body)('filename')),
    __param(1, (0, common_1.Body)('originalFilename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], S3Controller.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.Body)('filetype')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "uploadFile", null);
exports.S3Controller = S3Controller = __decorate([
    (0, common_1.Controller)('s3'),
    __metadata("design:paramtypes", [s3_service_1.S3Service])
], S3Controller);
//# sourceMappingURL=s3.controller.js.map