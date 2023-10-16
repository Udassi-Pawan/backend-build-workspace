import { Doc, DocDocument } from './docs.schema';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
export declare class DocsRepository {
    private DocModel;
    constructor(DocModel: Model<DocDocument>);
    findOne(DocFilterQuery: FilterQuery<Doc>): Promise<Doc>;
    create(Doc: Doc): Promise<DocDocument>;
    findOneAndUpdate(DocFilterQuery: FilterQuery<Doc>, Doc: UpdateQuery<Doc>): Promise<Doc>;
}
