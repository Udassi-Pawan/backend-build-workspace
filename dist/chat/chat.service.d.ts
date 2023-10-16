import { GroupsService } from 'src/schemas/groups/groups.service';
export declare class ChatService {
    private readonly groupService;
    constructor(groupService: GroupsService);
    create({ sender, text, groupId, senderName, image, video }: {
        sender: any;
        text: any;
        groupId: any;
        senderName: any;
        image: any;
        video: any;
    }): Promise<import("../schemas/chats/message.schema").Message>;
}
