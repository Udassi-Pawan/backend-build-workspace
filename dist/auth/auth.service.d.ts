import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/schemas/users/users.service';
export declare class AuthService {
    private config;
    private jwt;
    private readonly usersService;
    constructor(config: ConfigService, jwt: JwtService, usersService: UsersService);
    login(tokenId: string): Promise<{
        authToken: string;
    }>;
}
