import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AssignedProgramOfUserInfo } from "src/app/models/program/assigned-program-of-user-info";
import { UserWorkProcessStats } from "src/app/models/utility/user-work-process-stats";
import { environment } from "src/environments/environment";
import { BaseService } from "../base-service";
import { ExceptionHandler } from "../common/exception-handler";

@Injectable()
export class StatService extends BaseService {
    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }
    public completedExercisesOfProgram(programIds: number[]): Observable<number[] | null> {
        return super.httpPostValue<number[]>(environment.request.endPoints.stat.completedExercisesOfProgram, programIds);
    }
    public userStats(): Observable<UserWorkProcessStats | null> {
        return super.httpGetModel<UserWorkProcessStats>(UserWorkProcessStats, environment.request.endPoints.stat.userStats);
    }
}