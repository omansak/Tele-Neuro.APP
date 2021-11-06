import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ExceptionHandler } from '../common/exception-handler';
import { ExercisePropertyDefinition } from 'src/app/models/utility/exercise-property-definition';
import { publishReplay, refCount, take } from 'rxjs/operators';
import { UserRole } from 'src/app/models/user/user-role';

@Injectable()
export class UtilityService extends BaseService {
    private static Cache: { [key: string]: Observable<any>; } = {};
    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }
    public listExercisePropertyDefinitions(): Observable<Array<ExercisePropertyDefinition> | null> {
        if (!UtilityService.Cache[this.listExercisePropertyDefinitions.name]) {
            UtilityService.Cache[this.listExercisePropertyDefinitions.name] = super.httpGetArrayModel<ExercisePropertyDefinition>(ExercisePropertyDefinition, environment.request.endPoints.utility.listExercisePropertyDefinitions)
                .pipe(
                    publishReplay(1),
                    refCount(),
                    take(1)
                );
        }
        return UtilityService.Cache[this.listExercisePropertyDefinitions.name];
    }
    public listRoleDefinitions(): Observable<Array<UserRole> | null> {
        if (!UtilityService.Cache[this.listRoleDefinitions.name]) {
            UtilityService.Cache[this.listRoleDefinitions.name] = super.httpGetArrayModel<UserRole>(UserRole, environment.request.endPoints.utility.listRoleDefinitions)
                .pipe(
                    publishReplay(1),
                    refCount(),
                    take(1)
                );
        }
        return UtilityService.Cache[this.listRoleDefinitions.name];
    }
}