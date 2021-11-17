import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ExceptionHandler } from '../common/exception-handler';
import { ProgramModel } from 'src/app/models/program/program-model';
import { ProgramInfo } from 'src/app/models/program/program-info';
import { PageInfo } from 'src/app/models/base-model';
import { AssignExerciseModel } from 'src/app/models/program/assign-exercise-model';
import { ProgramAssignedExerciseInfo } from 'src/app/models/program/program-assigned-exercise-info';
import { AssignUserModel } from 'src/app/models/program/assign-user-model';
import { AssignedProgramUsersModel } from 'src/app/models/program/assigned-program-users-model';
import { AssignedProgramUserInfo } from 'src/app/models/program/assigned-program-users-info';

@Injectable()
export class ProgramService extends BaseService {
    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }
    public updateProgram(model: ProgramModel): Observable<ProgramInfo | null> {
        return super.httpPostModel<ProgramInfo>(ProgramInfo, environment.request.endPoints.program.updateProgram, model);
    }
    public programInfo(programId: number): Observable<ProgramInfo | null> {
        return super.httpGetModel<ProgramInfo>(ProgramInfo, `${environment.request.endPoints.content.programInfo}/${programId}`);
    }
    public listPrograms(pageInfo: PageInfo): Observable<Array<ProgramInfo> | null> {
        return super.httpPostArrayModel<ProgramInfo>(ProgramInfo, environment.request.endPoints.program.listPrograms, pageInfo);
    }
    public toggleProgramStatus(id: number): Observable<boolean> {
        return super.httpPostValue<boolean>(environment.request.endPoints.program.toggleProgramStatus, id);
    }
    public assignExercise(model: AssignExerciseModel): Observable<number> {
        return super.httpPostValue<number>(environment.request.endPoints.program.assignExercise, model);
    }
    public assignedExercises(programId: number): Observable<Array<ProgramAssignedExerciseInfo> | null> {
        return super.httpPostArrayModel<ProgramAssignedExerciseInfo>(ProgramAssignedExerciseInfo, environment.request.endPoints.program.assignedExercises, programId);
    }
    public changeSequenceAssignedExercise(relationId: number, direction: number): Observable<boolean> {
        return super.httpPostValue<boolean>(environment.request.endPoints.program.changeSequenceAssignedExercise, { id: relationId, direction: direction });
    }
    public deleteAssignedExercise(relationId: number): Observable<boolean> {
        return super.httpPostValue<boolean>(environment.request.endPoints.program.deleteAssignedExercise, relationId);
    }
    public assignUser(model: AssignUserModel): Observable<number> {
        return super.httpPostValue<number>(environment.request.endPoints.program.assignUser, model);
    }
    public deleteAssignedUser(model: AssignUserModel): Observable<boolean> {
        return super.httpPostValue<boolean>(environment.request.endPoints.program.deleteAssignedUser, model);
    }
    public listAssignedUsers(model: AssignedProgramUsersModel): Observable<Array<AssignedProgramUserInfo> | null> {
        return super.httpPostArrayModel<AssignedProgramUserInfo>(AssignedProgramUserInfo, environment.request.endPoints.program.listAssignedUsers, model);
    }
}