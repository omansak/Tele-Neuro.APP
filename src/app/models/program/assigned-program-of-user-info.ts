import { IBaseModel } from "../base-model";

export class AssignedProgramOfUserInfo implements IBaseModel<AssignedProgramOfUserInfo> {
    ProgramId: number;
    ProgramName: string;
    ExerciseCount: number;
    CompletedExercisesCount: number;
    CategoryName: string;
    AssignDate: Date;
    mapModel(json: any): AssignedProgramOfUserInfo {
        this.ProgramId = json.programId
        this.ProgramName = json.programName
        this.ExerciseCount = json.exerciseCount
        this.CompletedExercisesCount = json.completedExercisesCount
        this.CategoryName = json.categoryName
        this.AssignDate = json.assignDate
        return this;
    }
}