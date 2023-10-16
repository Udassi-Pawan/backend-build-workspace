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
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const groups_service_1 = require("./groups.service");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../users/users.service");
class Request {
}
let GroupsController = exports.GroupsController = class GroupsController {
    constructor(groupsService, usersService) {
        this.groupsService = groupsService;
        this.usersService = usersService;
    }
    async createGroup(members, name, image, description, req) {
        const userFromDb = await this.usersService.getUser(req.user.email);
        return this.groupsService.createGroup(name, userFromDb._id, [userFromDb._id, ...members], image, description);
    }
    async getGroupById(groupId, req) {
        const group = await this.groupsService.getGroupById(groupId);
        console.log('group request');
        if (group.members.find((m) => m.email == req.user.email))
            return group;
        else
            return { _id: 'none' };
    }
    all() {
        return this.groupsService.getAllGroups();
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)('members')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('image')),
    __param(3, (0, common_1.Body)('description')),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, String, String, Request]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "createGroup", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('/single/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getGroupById", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "all", null);
exports.GroupsController = GroupsController = __decorate([
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [groups_service_1.GroupsService,
        users_service_1.UsersService])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map