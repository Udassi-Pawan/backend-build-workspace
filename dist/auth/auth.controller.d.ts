import { Request } from '@nestjs/common';
import { AuthService } from './auth.service';
interface Request {
    user: any;
    headers: any;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(req: Request): Promise<{
        authToken: string;
    }>;
    test(): string;
}
export {};
