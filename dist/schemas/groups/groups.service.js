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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const groups_repository_1 = require("./groups.repository");
const users_service_1 = require("../users/users.service");
require("bson");
let GroupsService = exports.GroupsService = class GroupsService {
    constructor(groupsRepository, usersService) {
        this.groupsRepository = groupsRepository;
        this.usersService = usersService;
    }
    async getGroupById(groupId) {
        return await this.groupsRepository.findOne({ _id: groupId });
    }
    async getGroupByName(groupName) {
        return await this.groupsRepository.findOne({ name: groupName });
    }
    async createGroup(name, creatorId, members, image, description) {
        const allGroups = await this.getAllGroups();
        if (allGroups.find((g) => g.name == name)) {
            console.log('already exists');
            return 'Name already exists';
        }
        const createdGroup = await this.groupsRepository.create({
            name,
            image,
            description,
            members,
            admin: creatorId,
            history: [],
            docs: [],
            files: [],
        });
        members.map(async (memberId) => {
            await this.usersService.updateUser({ _id: memberId }, { $push: { groups: String(createdGroup._id) } });
        });
        return createdGroup;
    }
    async addText(sender, text, groupId, senderName, image, video) {
        const message = {
            video,
            text,
            sender,
            senderName,
            timestamp: Date.now(),
            image,
        };
        await this.groupsRepository.findOneAndUpdate({ _id: groupId }, { $push: { history: message } });
        return message;
    }
    async joinGroup(userId, groupId) {
        await this.groupsRepository.findOneAndUpdate({ _id: groupId }, { $push: { members: userId } });
    }
    async leaveGroup(userId, groupId) {
        await this.groupsRepository.findOneAndUpdate({ _id: groupId }, { $pull: { members: userId } });
    }
    async getAllGroups() {
        return await this.groupsRepository.findAll();
    }
    async updateDoc(groupId, docName) {
        const myDoc = this.groupsRepository.findOne({ _id: groupId });
    }
};
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [groups_repository_1.GroupsRepository,
        users_service_1.UsersService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map