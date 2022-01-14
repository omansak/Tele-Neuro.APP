import { IBaseModel } from "../base-model";

export class AssignedBrochureUserInfo implements IBaseModel<AssignedBrochureUserInfo> {
    RelationId: number;
    UserId: number;
    Name: string;
    Surname: string;
    Email: string;

    mapModel(json: any): AssignedBrochureUserInfo {
        this.RelationId = json.relationId
        this.UserId = json.userId
        this.Name = json.name
        this.Surname = json.surname
        this.Email = json.email
        return this;
    }
}