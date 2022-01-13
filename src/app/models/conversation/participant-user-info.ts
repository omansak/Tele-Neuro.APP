import { IBaseModel } from "../base-model";
import { UserModel } from "../user/user-model";
import { UserProfileModel } from "../user/user-profile-model";

export class ParticipantUserInfo implements IBaseModel<ParticipantUserInfo> {
    User: UserModel;
    UserProfile: UserProfileModel;
    mapModel(json: any): ParticipantUserInfo {
        if (json.user) {
            this.User = new UserModel().mapModel(json.user);
        }
        if (json.userProfile) {
            this.UserProfile = new UserProfileModel().mapModel(json.userProfile);
        }
        return this;
    }
}
