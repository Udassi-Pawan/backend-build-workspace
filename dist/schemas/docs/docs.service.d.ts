import { DocsRepository } from './docs.repository';
import 'bson';
import { GroupsRepository } from '../groups/groups.repository';
export declare class DocsService {
    private readonly docsRepository;
    private readonly groupsRepository;
    constructor(docsRepository: DocsRepository, groupsRepository: GroupsRepository);
    createDoc(groupId: any, docName: any): Promise<import("./docs.schema").DocDocument>;
    updateDoc(docId: any, text: any): Promise<import("./docs.schema").Doc>;
    findDoc(docId: any): Promise<import("./docs.schema").Doc>;
}
