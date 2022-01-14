import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ExceptionHandler } from '../common/exception-handler';
import { PageInfo, ResponseProgressive } from 'src/app/models/base-model';
import { BrochureInfo } from 'src/app/models/brochure/brochure-info';
import { BrochureModel } from 'src/app/models/brochure/brochure-model';
import { AssignBrochureUserModel } from 'src/app/models/brochure/assign-brochure-model';
import { AssignedBrochureUsersModel } from 'src/app/models/brochure/assigned-brochure-users-model';
import { AssignedBrochureUserInfo } from 'src/app/models/brochure/assigned-brochure-users-info';

@Injectable()
export class BrochureService extends BaseService {

    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }

    public brochureInfo(brochure: number): Observable<BrochureInfo | null> {
        return super.httpGetModel<BrochureInfo>(BrochureInfo, `${environment.request.endPoints.brochure.brochureInfo}/${brochure}`);
    }

    public listBrochures(pageInfo: PageInfo): Observable<Array<BrochureInfo> | null> {
        return super.httpPostArrayModel<BrochureInfo>(BrochureInfo, environment.request.endPoints.brochure.listBrochures, pageInfo);
    }

    public toggleBrochureStatus(id: number): Observable<boolean> {
        return super.httpPostValue<boolean>(environment.request.endPoints.brochure.toggleBrochureStatus, { id: id });
    }

    public updateBrochureProgressive(model: BrochureModel): Observable<ResponseProgressive<BrochureInfo>> {
        let form = new FormData();
        form.append("Id", (model.Id || 0).toString());
        form.append("Name", model.Name);
        form.append("IsActive", model.IsActive ? "true" : "false");
        if (model.File.IsChanged) {
            form.append("File", model.File.File!);
        }
        return super.httpPostModelProgressive<BrochureInfo>(BrochureInfo, environment.request.endPoints.brochure.updateBrochure, form);
    }

    
    public assignUser(model: AssignBrochureUserModel): Observable<number> {
        return super.httpPostValue<number>(environment.request.endPoints.brochure.assignUser, model);
    }

    public deleteAssignedUser(model: AssignBrochureUserModel): Observable<boolean> {
        return super.httpPostValue<boolean>(environment.request.endPoints.brochure.deleteAssignedUser, model);
    }

    public listAssignedUsers(model: AssignedBrochureUsersModel): Observable<Array<AssignedBrochureUserInfo> | null> {
        return super.httpPostArrayModel<AssignedBrochureUserInfo>(AssignedBrochureUserInfo, environment.request.endPoints.brochure.listAssignedUsers, model);
    }
}