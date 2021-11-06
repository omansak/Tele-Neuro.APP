import { IBaseModel } from "../base-model";

export class UserProfileModel implements IBaseModel<UserProfileModel> {
    Id: number;
    UserId: number;
    Name: string;
    Surname: string;
    BirthDate: Date | string | null;

    mapModel(json: any): UserProfileModel {
        this.Id = json.id
        this.UserId = json.userId
        this.Name = json.name
        this.Surname = json.surname
        this.BirthDate = json.birthDate
        return this;
    }
}