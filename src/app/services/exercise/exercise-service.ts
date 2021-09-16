import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ExceptionHandler } from '../common/exception-handler';
import { PageInfo, ResponseProgressive } from 'src/app/models/base-model';
import { ExerciseInfo } from 'src/app/models/exercise/exercise-info';
import { ExerciseModel } from 'src/app/models/exercise/exercise-model';

@Injectable()
export class ExerciseService extends BaseService {
    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }
    public listExercises(pageInfo: PageInfo): Observable<Array<ExerciseInfo> | null> {
        return super.httpPostArrayModel<ExerciseInfo>(ExerciseInfo, environment.request.endPoints.exercise.listExercises,pageInfo);
    }
    public toggleExerciseStatus(id: number): Observable<boolean> {
        return super.httpPostValue<boolean>(environment.request.endPoints.exercise.toggleExerciseStatus, { id: id });
    }
    public updateExerciseProgressive(model: ExerciseModel): Observable<ResponseProgressive<ExerciseInfo>> {
        let form = new FormData();
        form.append("Id", (model.Id || 0).toString());
        form.append("Name", model.Name);
        form.append("Description", model.Description);
        form.append("IsActive", model.IsActive ? "true" : "false");
        if (model.File.IsChanged) {
            form.append("File", model.File.File!);
        }
        return super.httpPostModelProgressive<ExerciseInfo>(ExerciseInfo, environment.request.endPoints.exercise.updateExercise, form);
    }
}