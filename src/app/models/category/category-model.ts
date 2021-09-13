import { ONgFileInput } from "src/app/components/shared/o-ng-file-input/o-ng-file-input.component";
import { IBaseModel } from "../base-model";
import { DocumentModel } from "../document/documen-model";

export class CategoryModel implements IBaseModel<CategoryModel> {
    Id: number;
    Name: string;
    Description: string;
    IsActive: boolean;
    CreatedDate: Date | string;
    CreatedUser: string;
    DocumentGuid: string;
    Document: DocumentModel;
    // NotMapped
    Image: ONgFileInput;

    mapModel(json: any): CategoryModel {
        this.Id = json.id
        this.Name = json.name
        this.Description = json.description
        this.IsActive = json.isActive
        this.CreatedDate = json.createdDate
        this.CreatedUser = json.createdUser
        this.DocumentGuid = json.documentGuid
        if (json.document) {
            this.Document = new DocumentModel().mapModel(json.document);
        }
        return this;
    }
}
