import { GroupsService } from './groups.service';
import { UsersService } from '../users/users.service';
import mongoose from 'mongoose';
import { User } from '../users/user.schema';
declare class Request {
    user: User;
}
export declare class GroupsController {
    private readonly groupsService;
    private readonly usersService;
    constructor(groupsService: GroupsService, usersService: UsersService);
    createGroup(members: mongoose.Schema.Types.ObjectId[], name: string, image: string, description: string, req: Request): Promise<string | import("./groups.schema").GroupDocument>;
    getGroupById(groupId: any, req: Request): Promise<import("./groups.schema").Group | {
        _id: string;
    }>;
    all(): Promise<Omit<mongoose.Document<unknown, {}, import("./groups.schema").GroupDocument> & import("./groups.schema").Group & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
}
export {};
