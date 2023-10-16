import mongoose, { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    groups: mongoose.Schema.Types.ObjectId[];
    files: mongoose.Schema.Types.ObjectId[];
    notificationToken: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, User> & User & {
    _id: mongoose.Types.ObjectId;
}>;
