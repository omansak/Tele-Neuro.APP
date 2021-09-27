export class AssignExerciseModel {
    Id: number;
    ProgramId: number;
    ExerciseId: number;
    AutoSkip: boolean;
    AutoSkipTime: number;
    UserId: number | null;
    Properties: Array<{ Id: number, Value: any }>;
}