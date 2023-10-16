import { DocsService } from './docs.service';
import mongoose from 'mongoose';
export declare class DocsController {
    private readonly docsService;
    constructor(docsService: DocsService);
    updateDoc(text: any, docId: mongoose.Schema.Types.ObjectId): Promise<import("./docs.schema").Doc | "doc does not exist">;
    createDoc(groupId: mongoose.Schema.Types.ObjectId, name: string): Promise<import("./docs.schema").DocDocument>;
    getSingleDoc(docId: mongoose.Schema.Types.ObjectId): Promise<import("./docs.schema").Doc>;
}
