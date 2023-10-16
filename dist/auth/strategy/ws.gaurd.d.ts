import { CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class WsGuard implements CanActivate {
    private config;
    private jwt;
    constructor(config: ConfigService, jwt: JwtService);
    canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any>;
}
