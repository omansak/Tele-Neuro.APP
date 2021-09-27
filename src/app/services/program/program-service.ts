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

@Injectable()
export class ProgramService extends BaseService {
    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }
    public updateProgram(model: ProgramModel): Observable<ProgramInfo | null> {
        return super.httpPostModel<ProgramInfo>(ProgramInfo, environment.request.endPoints.program.updateProgram, model);
    }
    public listPrograms(pageInfo: PageInfo): Observable<Array<ProgramInfo> | null> {
        return super.httpPostArrayModel<ProgramInfo>(ProgramInfo, environment.request.endPoints.program.listPrograms, pageInfo);
    }
    public toggleProgramStatus(id: number): Observable<boolean> {
        return super.httpPostValue<boolean>(environment.request.endPoints.program.toggleProgramStatus, { id: id });
    }
    public assignExercise(model: AssignExerciseModel): Observable<number> {
        return super.httpPostValue<number>(environment.request.endPoints.program.assignExercise, model);
    }
}