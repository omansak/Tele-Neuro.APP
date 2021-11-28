import { environment } from "src/environments/environment"
import { IBaseServiceConfiguration } from "../services/base-service"
import { LogLevel } from "./enums"

export const DEFAULT_TOASTR_CONFIG = {
    timeOut: 5500,
    extendedTimeOut: 1500,
    positionClass: 'toast-top-right',
    toastClass: "ngx-toastr animate__animated animate__fadeInRight",
    preventDuplicates: false,
    progressBar: true,
}

export const DEFAULT_BASE_SERVICE_CONFIGURATION: IBaseServiceConfiguration = {
    Timeout: 90 * 1000,
    Host: environment.request.host,
    EndPoint: environment.request.rootEndPoint,
    Headers: [
        {
            Key: 'Content-Type', Value: 'application/json'
        }
    ]
}

export const MIN_LOG_LEVEL: LogLevel = LogLevel.Access