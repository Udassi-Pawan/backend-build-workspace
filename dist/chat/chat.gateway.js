"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const chat_service_1 = require("./chat.service");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const ws_gaurd_1 = require("../auth/strategy/ws.gaurd");
const users_service_1 = require("../schemas/users/users.service");
const groups_service_1 = require("../schemas/groups/groups.service");
let ChatGateway = exports.ChatGateway = class ChatGateway {
    constructor(chatService, usersService, groupsService) {
        this.chatService = chatService;
        this.usersService = usersService;
        this.groupsService = groupsService;
        this.roomJoined = {};
        this.socketToUser = {};
        this.callStatus = {};
    }
    handleConnection(client) {
        client.on('disconnecting', async (reason) => {
            const user = this.socketToUser[client.id];
            if (!user)
                return;
            console.log('disconnected', user, client.id);
            const userFromDb = await this.usersService.getUser(user.email);
            const groups = userFromDb.groups.reduce((total, curr) => [...total, String(curr._id)], []);
            groups?.map(async (g) => {
                this.roomJoined[g] = this.roomJoined[g]?.filter(function (e) {
                    return e.clientId !== client.id;
                });
                this.callStatus[g] = this.callStatus[g]?.filter(function (e) {
                    return e.clientId !== client.id;
                });
                this.server.to(g).emit(`usersOnline${String(g)}`, {
                    usersOnline: this.roomJoined[g],
                    callStatus: this.callStatus[g],
                });
            });
        });
    }
    async usersOnline(groupId) {
        return {
            usersOnline: this.roomJoined[groupId],
            callStatus: this.callStatus[groupId],
        };
    }
    async joinRoom(client, req) {
        this.socketToUser[client.id] = req.user;
        console.log('connected', client.id, req.user.name);
        const userFromDb = await this.usersService.getUser(req.user.email);
        const groups = userFromDb.groups.reduce((total, curr) => [...total, String(curr)], []);
        client.join(groups);
        const callStatusForUser = {};
        groups.map(async (g) => {
            if (this.callStatus[g])
                callStatusForUser[g] = this.callStatus[g];
            if (!this.roomJoined[g])
                this.roomJoined[g] = [];
            this.roomJoined[g].push({
                ...req.user,
                _id: userFromDb._id,
                clientId: client.id,
            });
            this.server
                .to(g)
                .emit(`usersOnline${String(g)}`, { usersOnline: this.roomJoined[g] }, (res) => {
                console.log(`sent online users with event usersOnline${String(g)}`);
            });
        });
        return callStatusForUser;
    }
    async create(image, text, groupId, socket, video, req) {
        console.log('received ', text, groupId, req.user.name);
        const userFromDb = await this.usersService.getUser(req.user.email);
        if (userFromDb.groups.find((g) => String(g) == groupId)) {
            const message = await this.chatService.create({
                sender: userFromDb._id,
                senderName: userFromDb.name,
                text,
                groupId,
                image,
                video,
            });
            socket.broadcast.to(groupId).emit('message', message);
            this.server.to(groupId).emit(`message ${groupId}`, message);
            return message;
        }
        else
            return 'user not member of group';
    }
    async startCall(socket, groupId, req) {
        console.log('startCall', groupId, req.user.name);
        this.callStatus[groupId] = [{ ...req.user, clientId: socket.id }];
        this.server
            .to(groupId)
            .emit(`callStatus${groupId}`, this.callStatus[groupId]);
    }
    async acceptCall(socket, req, groupId) {
        console.log('acceptCall', req.user.name);
        this.callStatus[groupId].push({ ...req.user, clientId: socket.id });
        this.server
            .to(groupId)
            .emit(`callStatus${groupId}`, this.callStatus[groupId]);
    }
    async clearCall(socket, groupId) {
        this.callStatus[groupId] = [];
        console.log('call cleared');
    }
    async endCall(client, groupId) {
        this.callStatus[groupId] = this.callStatus[groupId]?.filter(function (e) {
            return e.clientId !== client.id;
        });
        console.log('end ', client.id, 'groupId', groupId);
        this.server
            .to(groupId)
            .emit(`callStatus${groupId}`, this.callStatus[groupId]);
    }
    async clientReady(groupId, socket) {
        console.log('client ready', groupId);
        socket.broadcast.to(groupId).emit('get-canvas-state');
    }
    async canvasState(groupId, state, socket) {
        console.log('received canvas state');
        setTimeout(() => {
            this.server.to(groupId).emit('canvas-state-from-server', state);
        }, 1000);
    }
    async drawLine(groupId, prevPoint, currentPoint, color, socket) {
        socket.broadcast
            .to(groupId)
            .emit('draw-line', { prevPoint, currentPoint, color });
    }
    async clear(groupId) {
        this.server.to(groupId).emit('clear');
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_gaurd_1.WsGuard),
    (0, websockets_1.SubscribeMessage)('usersOnline'),
    __param(0, (0, websockets_1.MessageBody)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "usersOnline", null);
__decorate([
    (0, common_1.UseGuards)(ws_gaurd_1.WsGuard),
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "joinRoom", null);
__decorate([
    (0, common_1.UseGuards)(ws_gaurd_1.WsGuard),
    (0, websockets_1.SubscribeMessage)('createChat'),
    __param(0, (0, websockets_1.MessageBody)('image')),
    __param(1, (0, websockets_1.MessageBody)('text')),
    __param(2, (0, websockets_1.MessageBody)('groupId')),
    __param(3, (0, websockets_1.ConnectedSocket)()),
    __param(4, (0, websockets_1.MessageBody)('video')),
    __param(5, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, socket_io_1.Socket, String, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(ws_gaurd_1.WsGuard),
    (0, websockets_1.SubscribeMessage)('startCall'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('groupId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "startCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('acceptCall'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, websockets_1.MessageBody)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "acceptCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('clearCall'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "clearCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('endCall'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "endCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('client-ready'),
    __param(0, (0, websockets_1.MessageBody)('groupId')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "clientReady", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('canvas-state'),
    __param(0, (0, websockets_1.MessageBody)('groupId')),
    __param(1, (0, websockets_1.MessageBody)('state')),
    __param(2, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "canvasState", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('draw-line'),
    __param(0, (0, websockets_1.MessageBody)('groupId')),
    __param(1, (0, websockets_1.MessageBody)('prevPoint')),
    __param(2, (0, websockets_1.MessageBody)('currentPoint')),
    __param(3, (0, websockets_1.MessageBody)('color')),
    __param(4, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "drawLine", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('clear'),
    __param(0, (0, websockets_1.MessageBody)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "clear", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        users_service_1.UsersService,
        groups_service_1.GroupsService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map