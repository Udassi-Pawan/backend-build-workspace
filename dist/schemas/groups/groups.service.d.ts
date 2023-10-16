import { GroupsRepository } from './groups.repository';
import { Group, GroupDocument } from './groups.schema';
import { UsersService } from '../users/users.service';
import mongoose from 'mongoose';
import 'bson';
import { Message } from '../chats/message.schema';
export declare class GroupsService {
    private readonly groupsRepository;
    private readonly usersService;
    constructor(groupsRepository: GroupsRepository, usersService: UsersService);
    getGroupById(groupId: string): Promise<Group>;
    getGroupByName(groupName: string): Promise<GroupDocument>;
    createGroup(name: string, creatorId: mongoose.Schema.Types.ObjectId, members: mongoose.Schema.Types.ObjectId[], image: string, description: string): Promise<GroupDocument | string>;
    addText(sender: mongoose.Schema.Types.ObjectId, text: string, groupId: string, senderName: any, image: string, video: string): Promise<Message>;
    joinGroup(userId: string, groupId: string): Promise<void>;
    leaveGroup(userId: string, groupId: string): Promise<void>;
    getAllGroups(): Promise<Omit<mongoose.Document<unknown, {}, GroupDocument> & Group & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>[]>;
    updateDoc(groupId: any, docName: any): Promise<void>;
}
