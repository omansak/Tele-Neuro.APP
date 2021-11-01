export class UserModel {
    Id: number;
    Token: string;
    TokenExpirationTimeStamp: number;
    Roles: Array<string>;
}