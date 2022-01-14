import { ONgFileInput } from "src/app/components/shared/o-ng-file-input/o-ng-file-input.component";
import { IBaseModel } from "../base-model";

export class BrochureModel implements IBaseModel<BrochureModel> {
    Id: number;
    Name: string;
    IsActive: boolean;
    CreatedDate: Date | string;
    CreatedUser: string;
    DocumentGuid: string;
    // NotMapped
    File: ONgFileInput;

    mapModel(json: any): BrochureModel {
        this.Id = json.id
        this.Name = json.name
        this.IsActive = json.isActive
        this.CreatedDate = json.createdDate
        this.CreatedUser = json.createdUser
        this.DocumentGuid = json.documentGuid
        return this;
    }
}
