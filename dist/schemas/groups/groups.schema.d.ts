import mongoose, { Document } from 'mongoose';
import { Message } from '../chats/message.schema';
export type GroupDocument = Group & Document;
export declare class Group {
    image: string;
    name: string;
    description: string;
    admin: mongoose.Schema.Types.ObjectId;
    members: mongoose.Schema.Types.ObjectId[];
    history: Message[];
    docs: mongoose.Schema.Types.ObjectId[];
    files: mongoose.Schema.Types.ObjectId[];
}
export declare const GroupsSchema: mongoose.Schema<Group, mongoose.Model<Group, any, any, any, mongoose.Document<unknown, any, Group> & Group & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Group, mongoose.Document<unknown, {}, Group> & Group & {
    _id: mongoose.Types.ObjectId;
}>;
