export interface IBaseModel<TModel> {
    mapModel(json: any): TModel;
}

export class ResponseProgressive<TModel> {
    Result: TModel | Array<TModel> | null;
    DownloadProgress: { Loaded: number, Total: number | undefined } | null;
    UploadProgress: { Loaded: number, Total: number | undefined } | null;
    IsDone: boolean;
    percentage(value: { Loaded: number, Total: number | undefined } | null): number {
        if (value && value.Total && value.Loaded) {
            return 100 / (value.Total! / value.Loaded);
        }
        return 0;
    }
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
    PageInfo: PageInfo;

    constructor() {
        this.PageInfo = new PageInfo();
    }
}
export class PageInfo {
    Page: number;
    PageSize: number;
    TotalCount: number;
    TotalPage: number;
    constructor(page?: number, pageSize?: number) {
        if (page)
            this.Page = page;
        if (pageSize)
            this.PageSize = pageSize;
    }
}