export interface AuthDto {
    email: string;
    password: string;
}
declare global {
    interface Headers {
        authorization: string;
    }
}
