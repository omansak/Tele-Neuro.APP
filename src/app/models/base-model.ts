export interface IBaseModel<TModel> {
    mapModel(json: any): TModel;
}

export class BaseResponse {
    Status: ResponseStatus = new ResponseStatus();
    Result: ResponseResult = new ResponseResult();
}

export class ResponseStatus {
    Domain: string;
    Success: boolean;
    Code: number;
    Time: Date;
    Message: string;
    Response: string;
}
export class ResponseResult {
    Message: string;
    Data: any;
    Type: string;
    Count: number;
    TotalCount: number;
    Page: number;
    TotalPage: number;
}