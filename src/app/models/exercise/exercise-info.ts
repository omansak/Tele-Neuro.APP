import { IBaseModel } from "../base-model";
import { DocumentModel } from "../document/document-model";
import { ExerciseModel } from "./exercise-model";

export class ExerciseInfo implements IBaseModel<ExerciseInfo> {
    Exercise: ExerciseModel;
    Document: DocumentModel;

    mapModel(json: any): ExerciseInfo {
        if (json.exercise) {
            this.Exercise = new ExerciseModel().mapModel(json.exercise);
        }
        if (json.document) {
            this.Document = new DocumentModel().mapModel(json.document);
        }
        return this;
    }
}
