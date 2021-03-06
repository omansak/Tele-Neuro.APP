import { ONgFileInput } from "src/app/components/shared/o-ng-file-input/o-ng-file-input.component";
import { IBaseModel } from "../base-model";

export class ExerciseModel implements IBaseModel<ExerciseModel> {
    Id: number;
    Name: string;
    Description: string;
    Keywords: string;
    IsActive: boolean;
    CreatedDate: Date | string;
    CreatedUser: string;
    DocumentGuid: string;
    // NotMapped
    File: ONgFileInput;

    mapModel(json: any): ExerciseModel {
        this.Id = json.id
        this.Name = json.name
        this.Description = json.description
        this.Keywords = json.keywords
        this.IsActive = json.isActive
        this.CreatedDate = json.createdDate
        this.CreatedUser = json.createdUser
        this.DocumentGuid = json.documentGuid
        return this;
    }
}
