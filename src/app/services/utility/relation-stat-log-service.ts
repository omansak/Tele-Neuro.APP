import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MIN_LOG_LEVEL } from "src/app/consts/defaults";
import { LogLevel } from "src/app/consts/enums";
import { RelationStatLogModel } from "src/app/models/utility/relation-stat-log-model";
import { environment } from "src/environments/environment";
import { BaseService } from "../base-service";

@Injectable()
export class RelationStatLogService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
    public insertRelationStatLog(model: RelationStatLogModel, logLevel: LogLevel = LogLevel.Access) {
        if (MIN_LOG_LEVEL <= logLevel) {
            super.httpPostValue<boolean>(environment.request.endPoints.stat.insertRelationStatLog, model).subscribe();
        }
    }
}