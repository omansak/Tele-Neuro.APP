import { IBaseModel } from "../base-model";

export class ProgramModel implements IBaseModel<ProgramModel> {
    Id: number;
    CategoryId: number;
    Name: string;
    Description: string;
    IsActive: boolean;
    IsPublic: boolean;
    CreatedUser: number | null;
    CreatedDate: Date | string;
    mapModel(json: any): ProgramModel {
        this.Id = json.id
        this.CategoryId = json.categoryId
        this.Name = json.name
        this.Description = json.description
        this.IsActive = json.isActive
        this.IsPublic = json.isPublic
        this.CreatedUser = json.createdUser
        this.CreatedDate = json.createdDate
        return this;
    }
}