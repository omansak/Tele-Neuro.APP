import { IBaseModel } from "../base-model";

export class UserWorkProcessStats implements IBaseModel<UserWorkProcessStats> {
    TotalPrograms: number;
    TotalCompletedExercises: number;
    TotalTimeAs5: number;

    mapModel(json: any): UserWorkProcessStats {
        this.TotalPrograms = json.totalPrograms
        this.TotalCompletedExercises = json.totalCompletedExercises
        this.TotalTimeAs5 = json.totalTimeAs5
        return this;
    }
}