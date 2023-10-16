import mongoose, { Document } from 'mongoose';
export type MessageDocument = Message & Document;
export declare class Message {
    sender: mongoose.Schema.Types.ObjectId;
    senderName: string;
    timestamp: number;
    text: string;
    image: string;
    video: string;
}
export declare const MessagesSchema: mongoose.Schema<Message, mongoose.Model<Message, any, any, any, mongoose.Document<unknown, any, Message> & Message & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Message, mongoose.Document<unknown, {}, Message> & Message & {
    _id: mongoose.Types.ObjectId;
}>;
