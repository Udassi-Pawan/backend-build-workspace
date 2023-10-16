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
exports.BotController = void 0;
const common_1 = require("@nestjs/common");
const bot_service_1 = require("./bot.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../schemas/users/users.service");
const groups_service_1 = require("../schemas/groups/groups.service");
class Request {
}
let BotController = exports.BotController = class BotController {
    constructor(botService, usersService, groupsService, jwt) {
        this.botService = botService;
        this.usersService = usersService;
        this.groupsService = groupsService;
        this.jwt = jwt;
    }
    async create(req) {
        const bearerToken = String(req.body.originalDetectIntentRequest.payload.userId);
        const user = this.jwt.verify(bearerToken, {
            publicKey: 'supersecret',
        });
        const intent = req.body.queryResult.intent.displayName;
        if (intent == 'join group') {
            const groupName = req.body.queryResult.parameters['group-name'];
            console.log('join group', groupName);
            const userFromDb = await this.usersService.getUser(user.email);
            const groupFromDb = await this.groupsService.getGroupByName(groupName);
            await this.groupsService.joinGroup(userFromDb._id, groupFromDb._id);
            await this.usersService.updateUser({ _id: userFromDb._id }, {
                $push: { groups: groupFromDb._id },
            });
            return {
                fulfillmentText: `Successfully joined group  ${groupName}, Reload now to see changes.`,
            };
        }
        else if (intent == 'leave group') {
            const groupName = req.body.queryResult.parameters['group-name'];
            console.log('leave group', groupName);
            const userFromDb = await this.usersService.getUser(user.email);
            const groupFromDb = await this.groupsService.getGroupByName(groupName);
            await this.groupsService.leaveGroup(userFromDb._id, groupFromDb._id);
            await this.usersService.updateUser({ _id: userFromDb._id }, {
                $pull: { groups: groupFromDb._id },
            });
            return {
                fulfillmentText: `Successfully left group  ${groupName}, Reload now to see changes.`,
            };
        }
        return {
            fulfillmentText: 'received',
        };
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], BotController.prototype, "create", null);
exports.BotController = BotController = __decorate([
    (0, common_1.Controller)('bot'),
    __metadata("design:paramtypes", [bot_service_1.BotService,
        users_service_1.UsersService,
        groups_service_1.GroupsService,
        jwt_1.JwtService])
], BotController);
//# sourceMappingURL=bot.controller.js.map