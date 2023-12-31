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
exports.GroupsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const groups_schema_1 = require("./groups.schema");
const mongoose_2 = require("mongoose");
let GroupsRepository = exports.GroupsRepository = class GroupsRepository {
    constructor(GroupModel) {
        this.GroupModel = GroupModel;
    }
    async findOne(GroupFilterQuery) {
        return this.GroupModel.findOne(GroupFilterQuery)
            .populate('members')
            .populate({
            path: 'files',
            populate: {
                path: 'owner',
            },
        })
            .populate('docs');
    }
    async create(Group) {
        const newGroup = new this.GroupModel(Group);
        return newGroup.save();
    }
    async findOneAndUpdate(GroupFilterQuery, Group) {
        return this.GroupModel.findOneAndUpdate(GroupFilterQuery, Group);
    }
    async findAll() {
        return this.GroupModel.find({}).populate('members');
    }
};
exports.GroupsRepository = GroupsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(groups_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GroupsRepository);
//# sourceMappingURL=groups.repository.js.map