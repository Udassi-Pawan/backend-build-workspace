"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let S3Service = exports.S3Service = class S3Service {
    constructor() {
        this.s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: 'us-east-1',
            signatureVersion: 'v4',
        });
    }
    async getPresignedUploadUrl(filetype, fileId) {
        const ex = filetype.split('/')[1];
        const Key = `${fileId}.${ex}`;
        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key,
            Expires: 60 * 3,
            ContentType: filetype,
        };
        const uploadUrl = await this.s3.getSignedUrl('putObject', s3Params);
        return { uploadUrl, Key };
    }
    async getPresignedDownloadUrl(filename, originalFilename) {
        console.log('originalFilename', originalFilename);
        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: filename,
            ResponseContentDisposition: `attachment; filename="${originalFilename}"`,
            Expires: 60 * 3,
        };
        return await this.s3.getSignedUrl('getObject', s3Params);
    }
};
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)()
], S3Service);
//# sourceMappingURL=s3.service.js.map