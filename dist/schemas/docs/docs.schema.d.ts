import mongoose, { Document } from 'mongoose';
export type DocDocument = Doc & Document;
export declare class Doc {
    name: string;
    timestamp: number;
    text: string;
    groupId: mongoose.Schema.Types.ObjectId;
}
export declare const DocsSchema: mongoose.Schema<Doc, mongoose.Model<Doc, any, any, any, mongoose.Document<unknown, any, Doc> & Doc & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Doc, mongoose.Document<unknown, {}, Doc> & Doc & {
    _id: mongoose.Types.ObjectId;
}>;
