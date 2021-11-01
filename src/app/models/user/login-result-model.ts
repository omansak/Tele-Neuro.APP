import { IBaseModel } from "../base-model";

export class LoginResultModel implements IBaseModel<LoginResultModel> {
    AccessToken: string;
    RefreshToken: string;
    Guid: string;
    RefreshTokenExpire: Date;

    mapModel(json: any): LoginResultModel {
        this.AccessToken = json.accessToken;
        if (json.refreshToken) {
            this.RefreshToken = json.refreshToken.tokenString;
            this.Guid = json.refreshToken.guid;
            this.RefreshTokenExpire = json.refreshToken.expireAt;
        }
        return this;
    }

}