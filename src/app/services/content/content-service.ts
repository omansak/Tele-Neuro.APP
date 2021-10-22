import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ExceptionHandler } from '../common/exception-handler';
import { ProgramInfo } from 'src/app/models/program/program-info';
import { AssignedExerciseModel } from 'src/app/models/program/assigned-exercise-model';

@Injectable()
export class ContentService extends BaseService {
    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }
    public searchExercises(programId: number): Observable<ProgramInfo | null> {
        return super.httpGetModel<ProgramInfo>(ProgramInfo, `${environment.request.endPoints.content.programInfo}/${programId}`);
    }
    public assignedExercises(programId: number): Observable<Array<AssignedExerciseModel> | null> {
        return super.httpGetArrayModel<AssignedExerciseModel>(AssignedExerciseModel, `${environment.request.endPoints.content.assignedExercises}/${programId}`);
    }
}