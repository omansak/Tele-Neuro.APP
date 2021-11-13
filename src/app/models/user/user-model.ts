import { IBaseModel } from "../base-model";

export class UserModel implements IBaseModel<UserModel> {
    Id: number;
    Email: string;
    Password: string;
    CreatedDate: Date;
    CreatedUser: number | null;
    LastLogin: Date;
    IsActive: boolean;

    mapModel(json: any): UserModel {
        this.Id = json.id
        this.Email = json.email
        this.Password = json.password
        this.CreatedDate = new Date(json.createdDate);
        this.CreatedUser = json.createdUser
        this.LastLogin = new Date(json.lastLogin);
        this.IsActive = json.isActive;
        return this;
    }
}