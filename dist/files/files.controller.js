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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../schemas/users/users.service");
const s3_service_1 = require("../s3/s3.service");
const groups_repository_1 = require("../schemas/groups/groups.repository");
const users_repository_1 = require("../schemas/users/users.repository");
class Request {
}
let FilesController = exports.FilesController = class FilesController {
    constructor(filesService, usersService, s3Service, groupsRepository, usersRepository) {
        this.filesService = filesService;
        this.usersService = usersService;
        this.s3Service = s3Service;
        this.groupsRepository = groupsRepository;
        this.usersRepository = usersRepository;
    }
    async createFile(req, filetype, name, groups) {
        console.log('create request');
        const userFromDb = await this.usersService.getUser(req.user.email);
        const curFile = await this.filesService.createFile(filetype, name, userFromDb._id);
        this.usersRepository.findOneAndUpdate({ _id: userFromDb._id }, { $push: { files: curFile._id } });
        groups.forEach(async (g) => {
            await this.groupsRepository.findOneAndUpdate({ _id: g }, { $push: { files: curFile._id } });
        });
        return await this.s3Service.getPresignedUploadUrl(filetype, curFile._id);
    }
    async downloadFile(req, filename, originalFilename) {
        const url = this.s3Service.getPresignedDownloadUrl(filename, originalFilename);
        console.log(url);
        return url;
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('filetype')),
    __param(2, (0, common_1.Body)('name')),
    __param(3, (0, common_1.Body)('groups')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String, Array]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "createFile", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('download'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('filename')),
    __param(2, (0, common_1.Body)('originalFilename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "downloadFile", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        users_service_1.UsersService,
        s3_service_1.S3Service,
        groups_repository_1.GroupsRepository,
        users_repository_1.UsersRepository])
], FilesController);
//# sourceMappingURL=files.controller.js.map