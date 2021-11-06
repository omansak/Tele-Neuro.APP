import { IBaseModel } from "../base-model";
import { UserModel } from "./user-model";
import { UserProfileModel } from "./user-profile-model";

export class UserInfo implements IBaseModel<UserInfo> {
    User: UserModel;
    UserProfile: UserProfileModel;
    Roles: Array<string>;
    mapModel(json: any): UserInfo {
        if (json.user) {
            this.User = new UserModel().mapModel(json.user);
        }
        if (json.userProfile) {
            this.UserProfile = new UserProfileModel().mapModel(json.userProfile);
        }
        if (json.roles) {
            this.Roles = json.roles;
        }
        return this;
    }
}
