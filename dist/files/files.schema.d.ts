import mongoose, { Document } from 'mongoose';
export type FileDocument = File & Document;
export declare class File {
    owner: mongoose.Schema.Types.ObjectId;
    name: string;
    type: string;
    extension: string;
    timestamp: number;
}
export declare const FilesSchema: mongoose.Schema<File, mongoose.Model<File, any, any, any, mongoose.Document<unknown, any, File> & File & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, File, mongoose.Document<unknown, {}, File> & File & {
    _id: mongoose.Types.ObjectId;
}>;
