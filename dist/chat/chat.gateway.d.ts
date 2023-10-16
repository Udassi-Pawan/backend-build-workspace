import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { UsersService } from 'src/schemas/users/users.service';
import { GroupsService } from 'src/schemas/groups/groups.service';
type Request = {
    user: any;
};
export declare class ChatGateway {
    private readonly chatService;
    private readonly usersService;
    private readonly groupsService;
    server: any;
    constructor(chatService: ChatService, usersService: UsersService, groupsService: GroupsService);
    handleConnection(client: Socket): void;
    usersOnline(groupId: string): Promise<{
        usersOnline: any;
        callStatus: any;
    }>;
    joinRoom(client: Socket, req: Request): Promise<{}>;
    create(image: string, text: string, groupId: string, socket: Socket, video: string, req: Request): Promise<import("../schemas/chats/message.schema").Message | "user not member of group">;
    roomJoined: {};
    socketToUser: {};
    callStatus: {};
    startCall(socket: Socket, groupId: any, req: Request): Promise<void>;
    acceptCall(socket: Socket, req: Request, groupId: any): Promise<void>;
    clearCall(socket: Socket, groupId: any): Promise<void>;
    endCall(client: Socket, groupId: any): Promise<void>;
    clientReady(groupId: any, socket: Socket): Promise<void>;
    canvasState(groupId: any, state: any, socket: Socket): Promise<void>;
    drawLine(groupId: any, prevPoint: any, currentPoint: any, color: any, socket: Socket): Promise<void>;
    clear(groupId: any): Promise<void>;
}
export {};
