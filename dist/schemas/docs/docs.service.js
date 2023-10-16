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
exports.DocsService = void 0;
const common_1 = require("@nestjs/common");
const docs_repository_1 = require("./docs.repository");
require("bson");
const groups_repository_1 = require("../groups/groups.repository");
let DocsService = exports.DocsService = class DocsService {
    constructor(docsRepository, groupsRepository) {
        this.docsRepository = docsRepository;
        this.groupsRepository = groupsRepository;
    }
    async createDoc(groupId, docName) {
        const doc = {
            name: docName,
            timestamp: Date.now(),
            text: '',
            groupId: groupId,
        };
        const savedDoc = await this.docsRepository.create(doc);
        const finalGroup = await this.groupsRepository.findOneAndUpdate({ _id: groupId }, { $push: { docs: savedDoc._id } });
        return savedDoc;
    }
    async updateDoc(docId, text) {
        return await this.docsRepository.findOneAndUpdate({ _id: docId }, {
            text: text,
            timestamp: Date.now(),
        });
    }
    async findDoc(docId) {
        return await this.docsRepository.findOne({ _id: docId });
    }
};
exports.DocsService = DocsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [docs_repository_1.DocsRepository,
        groups_repository_1.GroupsRepository])
], DocsService);
//# sourceMappingURL=docs.service.js.map