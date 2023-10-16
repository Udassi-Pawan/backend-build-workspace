import { FilesRepository } from './files.repository';
import mongoose from 'mongoose';
export declare class FilesService {
    private readonly filesRepository;
    constructor(filesRepository: FilesRepository);
    createFile(filetype: string, name: string, creator: mongoose.Schema.Types.ObjectId): Promise<import("./files.schema").FileDocument>;
}
