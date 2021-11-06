export class AuthUserModel {
    Id: number;
    Token: string;
    TokenExpirationTimeStamp: number;
    Roles: Array<string>;
}