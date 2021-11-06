import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseFilterModel } from "src/app/models/base-filter-model";
import { UserInfo } from "src/app/models/user/user-info";
import { UserRegisterModel } from "src/app/models/user/user-register-model";
import { environment } from "src/environments/environment";
import { BaseService } from "../base-service";
import { ExceptionHandler } from "../common/exception-handler";

@Injectable()
export class UserService extends BaseService {
    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }
    public listFilterUsers(model: BaseFilterModel): Observable<Array<UserInfo> | null> {
        return super.httpPostArrayModel<UserInfo>(UserInfo, environment.request.endPoints.user.listFilterUsers, model);
    }
    public addUser(model: UserRegisterModel): Observable<number | null> {
        return super.httpPostValue<number>(environment.request.endPoints.user.addUser, model);
    }
}