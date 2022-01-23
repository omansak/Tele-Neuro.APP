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

export const UserRoleDefinition = {
    Administrator: {
        Key: "ADMIN",
        Name: "Yönetici",
        Priority: 0
    },
    Editor: {
        Key: "EDITOR",
        Name: "Editör",
        Priority: 1
    },
    Contributor: {
        Key: "CONTRIBUTOR",
        Name: "Fizyoterapist",
        Priority: 2
    },
    Subscriber: {
        Key: "SUBSCRIBER",
        Name: "Hasta",
        Priority: 3
    },
    NonUser: {
        Key: "NON-USER",
        Name: "NonUser",
        Priority: 99
    },
}

export const ConvertRoleKeyToRoleObject = (role: string) => {
    switch (role) {
        case "ADMIN":
            return UserRoleDefinition.Administrator;
        case "EDITOR":
            return UserRoleDefinition.Editor;
        case "CONTRIBUTOR":
            return UserRoleDefinition.Contributor;
        case "SUBSCRIBER":
            return UserRoleDefinition.Subscriber;
        default:
            return UserRoleDefinition.NonUser;
    }
}