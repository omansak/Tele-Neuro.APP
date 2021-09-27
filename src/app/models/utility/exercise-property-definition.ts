import { IBaseModel } from "../base-model";

export class ExercisePropertyDefinition implements IBaseModel<ExercisePropertyDefinition> {
    Id: number;
    Name: string;
    Description: string;
    UnitName: string;
    IsNumber: boolean;
    
    getType(): 'number' | 'text' {
        return this.IsNumber ? 'number' : 'text';
    }

    mapModel(json: any): ExercisePropertyDefinition {
        this.Id = json.id;
        this.Name = json.name;
        this.Description = json.description;
        this.UnitName = json.unitName;
        this.IsNumber = json.isNumber;
        return this;
    }
}