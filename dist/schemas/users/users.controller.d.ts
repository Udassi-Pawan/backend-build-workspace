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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from './users.service';
import { GroupsService } from '../groups/groups.service';
declare class CreateUserDto {
    email: string;
    name: string;
}
declare class Request {
    user: any;
}
export declare class UsersController {
    private readonly usersService;
    private readonly groupsService;
    constructor(usersService: UsersService, groupsService: GroupsService);
    createUser(data: CreateUserDto): Promise<import("./user.schema").User>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUser(email: any): Promise<import("./user.schema").UserDocument>;
    joinGroup(req: Request, data: {
        groupId: string;
    }): Promise<import("./user.schema").User>;
    leaveGroup(req: Request, data: {
        groupId: string;
    }): Promise<import("./user.schema").User>;
}
export {};
