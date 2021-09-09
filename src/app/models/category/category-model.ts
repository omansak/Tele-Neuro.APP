import { IBaseModel } from "../base-model";
export class CategoryModel implements IBaseModel<CategoryModel> {
    Id: number;
    Name: string;
    Description: string;
    IsActive: boolean;
    CreatedDate: Date | string;
    CreatedUser: string;
    DocumentGuid: string;
    // NotMapped
    Image: File;

    mapModel(json: any): CategoryModel {
        this.Id = json.id
        this.Name = json.name
        this.Description = json.description
        this.IsActive = json.isActive
        this.CreatedDate = json.createdDate
        this.CreatedUser = json.createdUser
        this.DocumentGuid = json.documentGuid
        return this;
    }
}
