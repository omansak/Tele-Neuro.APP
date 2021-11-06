import { IBaseModel } from "../base-model";

export class UserModel implements IBaseModel<UserModel> {
    Id: number;
    Email: string;
    Password: string;
    CreatedDate: Date;
    CreatedUser: number | null;
    LastLogin: Date;

    mapModel(json: any): UserModel {
        this.Id = json.id
        this.Email = json.email
        this.Password = json.password
        this.CreatedDate = new Date(json.createdDate);
        this.CreatedUser = json.createdUser
        this.LastLogin = new Date(json.lastLogin);

        return this;
    }
}