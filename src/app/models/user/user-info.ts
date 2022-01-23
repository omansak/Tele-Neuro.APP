import { IBaseModel } from "../base-model";
import { UserModel } from "./user-model";
import { UserProfileModel } from "./user-profile-model";
import { UserRole } from "./user-role";

export class UserInfo implements IBaseModel<UserInfo> {
    User: UserModel;
    UserProfile: UserProfileModel;
    Roles: Array<UserRole>;

    // NotMapped
    MaxPriorityRole: UserRole;
    MinPriorityRole: UserRole;
    mapModel(json: any): UserInfo {
        if (json.user) {
            this.User = new UserModel().mapModel(json.user);
        }
        if (json.userProfile) {
            this.UserProfile = new UserProfileModel().mapModel(json.userProfile);
        }
        if (json.roles) {
            this.Roles = (<Array<any>>json.roles).map(i => new UserRole().mapModel(i));
            this.MaxPriorityRole = this.Roles.reduce(function (prev, current) {
                return (prev.Priority < current.Priority) ? prev : current
            });
        }
        return this;
    }
}
