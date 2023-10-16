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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const passport_1 = require("@nestjs/passport");
const groups_service_1 = require("../groups/groups.service");
class CreateUserDto {
}
class Request {
}
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService, groupsService) {
        this.usersService = usersService;
        this.groupsService = groupsService;
    }
    async createUser(data) {
        return this.usersService.createUser(data.email, data.name);
    }
    findAll() {
        return this.usersService.findAll();
    }
    async getUser(email) {
        return this.usersService.getUser(email);
    }
    async joinGroup(req, data) {
        const userFromDb = await this.usersService.getUser(req.user.email);
        await this.groupsService.joinGroup(userFromDb._id, data.groupId);
        const updatedUser = await this.usersService.updateUser({ _id: userFromDb._id }, {
            $push: { groups: data.groupId },
        });
        return updatedUser;
    }
    async leaveGroup(req, data) {
        console.log('user leave', data.groupId);
        const userFromDb = await this.usersService.getUser(req.user.email);
        await this.groupsService.leaveGroup(userFromDb._id, data.groupId);
        const updatedUser = await this.usersService.updateUser({ _id: userFromDb._id }, {
            $pull: { groups: data.groupId },
        });
        return updatedUser;
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/join'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "joinGroup", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/leave'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "leaveGroup", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        groups_service_1.GroupsService])
], UsersController);
//# sourceMappingURL=users.controller.js.map