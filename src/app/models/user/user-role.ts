import { IBaseModel } from "../base-model";

export class UserRole implements IBaseModel<UserRole> {
    Id: number;
    Key: string;
    Name: string;
    Description: string;
    Priority: number;

    mapModel(json: any): UserRole {
        this.Id = json.id
        this.Key = json.key
        this.Name = json.name
        this.Description = json.description
        this.Priority = json.priority
        return this;
    }
}