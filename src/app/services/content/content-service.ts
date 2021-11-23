import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ExceptionHandler } from '../common/exception-handler';
import { ProgramInfo } from 'src/app/models/program/program-info';
import { ProgramAssignedExerciseInfo } from 'src/app/models/program/program-assigned-exercise-info';
import { PageInfo } from 'src/app/models/base-model';
import { AssignedProgramOfUserInfo } from 'src/app/models/program/assigned-program-of-user-info';

@Injectable()
export class ContentService extends BaseService {
    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }
    public programInfo(programId: number): Observable<ProgramInfo | null> {
        return super.httpGetModel<ProgramInfo>(ProgramInfo, `${environment.request.endPoints.content.programInfo}/${programId}`);
    }
    public assignedExercises(programId: number): Observable<Array<ProgramAssignedExerciseInfo> | null> {
        return super.httpGetArrayModel<ProgramAssignedExerciseInfo>(ProgramAssignedExerciseInfo, `${environment.request.endPoints.content.assignedExercises}/${programId}`);
    }
    public selfAssignedPrograms(pageInfo: PageInfo): Observable<Array<AssignedProgramOfUserInfo> | null> {
        return super.httpPostArrayModel<AssignedProgramOfUserInfo>(AssignedProgramOfUserInfo, environment.request.endPoints.content.selfAssignedPrograms, pageInfo);
    }
}