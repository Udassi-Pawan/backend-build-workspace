import { BotService } from './bot.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/schemas/users/users.service';
import { GroupsService } from 'src/schemas/groups/groups.service';
declare class Request {
    user: any;
    body: any;
    query: any;
}
export declare class BotController {
    private readonly botService;
    private readonly usersService;
    private readonly groupsService;
    private jwt;
    constructor(botService: BotService, usersService: UsersService, groupsService: GroupsService, jwt: JwtService);
    create(req: Request): Promise<{
        fulfillmentText: string;
    }>;
}
export {};
