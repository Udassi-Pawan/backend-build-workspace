/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Group, GroupDocument } from './groups.schema';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
export declare class GroupsRepository {
    private GroupModel;
    constructor(GroupModel: Model<GroupDocument>);
    findOne(GroupFilterQuery: FilterQuery<Group>): Promise<GroupDocument>;
    create(Group: Group): Promise<GroupDocument>;
    findOneAndUpdate(GroupFilterQuery: FilterQuery<Group>, Group: UpdateQuery<Group>): Promise<Group>;
    findAll(): Promise<Omit<import("mongoose").Document<unknown, {}, GroupDocument> & Group & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
}
