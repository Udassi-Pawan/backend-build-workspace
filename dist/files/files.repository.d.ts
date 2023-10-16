import { File, FileDocument } from './files.schema';
import { Model, FilterQuery } from 'mongoose';
export declare class FilesRepository {
    private FileModel;
    constructor(FileModel: Model<FileDocument>);
    findOne(DocFilterQuery: FilterQuery<File>): Promise<File>;
    create(File: File): Promise<FileDocument>;
}
