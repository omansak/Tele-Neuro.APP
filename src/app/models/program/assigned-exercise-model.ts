import { IBaseModel } from "../base-model";
import { ExerciseModel } from "../exercise/exercise-model";
import { ExercisePropertyDefinition } from "../utility/exercise-property-definition";

export class AssignedExerciseModel implements IBaseModel<AssignedExerciseModel>  {
    RelationId: number;
    ProgramId: number;
    Sequence: number;
    AutoSkip: boolean;
    AutoSkipTime: number | null;
    Exercise: ExerciseModel;
    Properties: { Value: string, Definition: ExercisePropertyDefinition }[];
    mapModel(json: any): AssignedExerciseModel {
        this.RelationId = json.relationId;
        this.ProgramId = json.programId;
        this.Sequence = json.sequence;
        this.AutoSkip = json.autoSkip;
        this.AutoSkipTime = json.autoSkipTime;

        if (json.exercise) {
            this.Exercise = new ExerciseModel().mapModel(json.exercise);
        }

        if (json.properties && Array.isArray(json.properties) && json.properties.length > 0) {
            this.Properties = [];
            (<Array<any>>json.properties).forEach(i => {
                this.Properties.push({ Value: i.value, Definition: new ExercisePropertyDefinition().mapModel(i.definition) });
            });
        }
        return this;
    }
}