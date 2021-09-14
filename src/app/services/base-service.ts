
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { BaseResponse, IBaseModel, ResponseProgressive } from 'src/app/models/base-model';
import { DEFAULT_BASE_SERVICE_CONFIGURATION } from '../consts/defaults';

export interface IExceptionHandler {
    handler: (any: any) => Observable<never>;
}

export interface IBaseServiceConfiguration {
    Timeout: number;
    Host: string;
    EndPoint?: string;
    Headers?: [{ Key: string, Value: string }]
}

export class BaseService {
    private _baseResponse: BaseResponse;
    private _header: HttpHeaders;
    private _catchError: boolean;
    private _configuration: IBaseServiceConfiguration = DEFAULT_BASE_SERVICE_CONFIGURATION
    constructor(
        private _httpClient: HttpClient,
        private _exceptionHandler?: IExceptionHandler) {
        this._header = new HttpHeaders();
        this._configuration.Headers?.forEach(i => {
            this._header.append(i.Key, i.Value);
        });
        this._catchError = !!_exceptionHandler;
    }

    private httpGet<T>(operation: string, params?: HttpParams): Observable<T> {
        return this._httpClient.get<T>(this.operationUri(operation), { params: params, headers: this._header })
            .pipe(
                timeout(this._configuration.Timeout),
                catchError(err => this.handleError(err))
            );
    }
    private httpPost<T>(operation: string, body?: any, params?: HttpParams): Observable<T> {
        return this._httpClient.post<T>(this.operationUri(operation), body, { params: params, headers: this._header })
            .pipe(
                timeout(this._configuration.Timeout),
                catchError(err => this.handleError(err))
            );
    }
    private httpGetProgressive<T>(operation: string, params?: HttpParams): Observable<HttpEvent<Object>> {
        return this._httpClient.get<T>(this.operationUri(operation), { params: params, headers: this._header, reportProgress: true, observe: 'events' })
            .pipe(
                timeout(this._configuration.Timeout),
                catchError(err => this.handleError(err))
            );
    }
    private httpPostProgressive<T>(operation: string, body?: any, params?: HttpParams): Observable<HttpEvent<Object>> {
        return this._httpClient.post<T>(this.operationUri(operation), body, { params: params, headers: this._header, reportProgress: true, observe: 'events' })
            .pipe(
                timeout(this._configuration.Timeout),
                catchError(err => this.handleError(err))
            );
    }
    //#region HttpGet
    protected httpGetBaseResponse(operation: string, params?: HttpParams): Observable<BaseResponse> {
        return this.httpGet<BaseResponse>(operation, params)
            .pipe(map(json => {
                return this.handleResponse(json);
            }));
    }
    protected httpGetBaseResponseProgressive(operation: string, params?: HttpParams): Observable<ResponseProgressive<BaseResponse>> {
        return this.httpGetProgressive<BaseResponse>(operation, params)
            .pipe(map(i => {
                let response = new ResponseProgressive<BaseResponse>();
                if (i.type == HttpEventType.Response) {
                    response.Result = this.handleResponse(i.body);
                    response.IsDone = true;
                }
                if (i.type == HttpEventType.DownloadProgress) {
                    response.DownloadProgress = { Loaded: i.loaded, Total: i.total }
                }
                if (i.type == HttpEventType.UploadProgress) {
                    response.UploadProgress = { Loaded: i.loaded, Total: i.total }
                }
                return response;
            }));
    }
    protected httpGetModel<TModel extends IBaseModel<TModel>>(cls: { new(): TModel }, operation: string, params?: HttpParams): Observable<TModel | null> {
        return this.httpGet<TModel>(operation, params)
            .pipe(map(json => {
                return this.mapResponse(json, cls);
            }));
    }
    protected httpGetModelProgressive<TModel extends IBaseModel<TModel>>(cls: { new(): TModel }, operation: string, params?: HttpParams): Observable<ResponseProgressive<TModel>> {
        return this.httpGetProgressive<TModel>(operation, params)
            .pipe(map(i => {
                let response = new ResponseProgressive<TModel>();
                if (i.type == HttpEventType.Response) {
                    response.Result = this.mapResponse(i, cls);
                    response.IsDone = true;
                }
                if (i.type == HttpEventType.DownloadProgress) {
                    response.DownloadProgress = { Loaded: i.loaded, Total: i.total }
                }
                if (i.type == HttpEventType.UploadProgress) {
                    response.UploadProgress = { Loaded: i.loaded, Total: i.total }
                }
                return response;
            }));
    }
    protected httpGetArrayModel<TModel extends IBaseModel<TModel>>(cls: { new(): TModel }, operation: string, params?: HttpParams): Observable<Array<TModel> | null> {
        return this.httpGet<Array<TModel>>(operation, params)
            .pipe(map(json => {
                return this.mapResponseArray(json, cls);
            }));
    }
    protected httpGetModelArrayProgressive<TModel extends IBaseModel<TModel>>(cls: { new(): TModel }, operation: string, params?: HttpParams): Observable<ResponseProgressive<TModel>> {
        return this.httpGetProgressive<Array<TModel>>(operation, params)
            .pipe(map(i => {
                let response = new ResponseProgressive<TModel>();
                if (i.type == HttpEventType.Response) {
                    response.Result = this.mapResponseArray(i, cls);
                    response.IsDone = true;
                }
                if (i.type == HttpEventType.DownloadProgress) {
                    response.DownloadProgress = { Loaded: i.loaded, Total: i.total }
                }
                if (i.type == HttpEventType.UploadProgress) {
                    response.UploadProgress = { Loaded: i.loaded, Total: i.total }
                }
                return response;
            }));
    }
    protected httpGetValue<TModel>(operation: string, params?: HttpParams): Observable<TModel> {
        return this.httpGet<BaseResponse>(operation, params)
            .pipe(map(json => {
                return <TModel>this.handleResponse(json).Result.Data;
            }));
    }
    protected httpGetValueProgressive<TModel>(operation: string, params?: HttpParams): Observable<ResponseProgressive<TModel>> {
        return this.httpGetProgressive(operation, params)
            .pipe(map(i => {
                let response = new ResponseProgressive<TModel>();
                if (i.type == HttpEventType.Response) {
                    response.Result = <TModel>this.handleResponse(i.body).Result.Data;
                    response.IsDone = true;
                }
                if (i.type == HttpEventType.DownloadProgress) {
                    response.DownloadProgress = { Loaded: i.loaded, Total: i.total }
                }
                if (i.type == HttpEventType.UploadProgress) {
                    response.UploadProgress = { Loaded: i.loaded, Total: i.total }
                }
                return response;
            }));
    }
    //#endregion
    //#region HttpPost
    protected httpPostBaseResponse(operation: string, body?: any, params?: HttpParams): Observable<BaseResponse> {
        return this.httpPost(operation, body, params)
            .pipe(map(json => {
                return this.handleResponse(json);
            }));
    }
    protected httpPostBaseResponseProgressive(operation: string, body?: any, params?: HttpParams): Observable<ResponseProgressive<BaseResponse>> {
        return this.httpPostProgressive(operation, body, params)
            .pipe(map(i => {
                let response = new ResponseProgressive<BaseResponse>();
                if (i.type == HttpEventType.Response) {
                    response.Result = this.handleResponse(i.body);
                    response.IsDone = true;
                }
                if (i.type == HttpEventType.DownloadProgress) {
                    response.DownloadProgress = { Loaded: i.loaded, Total: i.total }
                }
                if (i.type == HttpEventType.UploadProgress) {
                    response.UploadProgress = { Loaded: i.loaded, Total: i.total }
                }
                return response;
            }));
    }
    protected httpPostModel<TModel extends IBaseModel<TModel>>(cls: { new(): TModel }, operation: string, body?: any, params?: HttpParams): Observable<TModel | null> {
        return this.httpPost(operation, body, params)
            .pipe(map(json => {
                return this.mapResponse(json, cls);
            }));
    }
    protected httpPostModelProgressive<TModel extends IBaseModel<TModel>>(cls: { new(): TModel }, operation: string, body?: any, params?: HttpParams): Observable<ResponseProgressive<TModel>> {
        return this.httpPostProgressive(operation, body, params)
            .pipe(map(i => {
                let response = new ResponseProgressive<TModel>();
                if (i.type == HttpEventType.Response) {
                    response.Result = this.mapResponse(i.body, cls);
                    response.IsDone = true;
                }
                if (i.type == HttpEventType.DownloadProgress) {
                    response.DownloadProgress = { Loaded: i.loaded, Total: i.total }
                }
                if (i.type == HttpEventType.UploadProgress) {
                    response.UploadProgress = { Loaded: i.loaded, Total: i.total }
                }
                return response;
            }));
    }
    protected httpPostArrayModel<TModel extends IBaseModel<TModel>>(cls: { new(): TModel }, operation: string, body?: any, params?: HttpParams): Observable<Array<TModel> | null> {
        return this.httpPost(operation, body, params)
            .pipe(map(json => {
                return this.mapResponseArray(json, cls);
            }));
    }
    protected httpPostArrayModelProgressive<TModel extends IBaseModel<TModel>>(cls: { new(): TModel }, operation: string, body?: any, params?: HttpParams): Observable<ResponseProgressive<TModel>> {
        return this.httpPostProgressive(operation, body, params)
            .pipe(map(i => {
                let response = new ResponseProgressive<TModel>();
                if (i.type == HttpEventType.Response) {
                    response.Result = this.mapResponseArray(i.body, cls);
                    response.IsDone = true;
                }
                if (i.type == HttpEventType.DownloadProgress) {
                    response.DownloadProgress = { Loaded: i.loaded, Total: i.total }
                }
                if (i.type == HttpEventType.UploadProgress) {
                    response.UploadProgress = { Loaded: i.loaded, Total: i.total }
                }
                return response;
            }));
    }
    protected httpPostValue<TModel>(operation: string, body?: any, params?: HttpParams): Observable<TModel> {
        return this.httpPost(operation, body, params)
            .pipe(map(json => {
                return <TModel>this.handleResponse(json).Result.Data;
            }));
    }
    protected httpPostValueProgressive<TModel>(operation: string, body?: any, params?: HttpParams): Observable<ResponseProgressive<TModel>> {
        return this.httpPostProgressive(operation, body, params)
            .pipe(map(i => {
                let response = new ResponseProgressive<TModel>();
                if (i.type == HttpEventType.Response) {
                    response.Result = <TModel>this.handleResponse(i.body).Result.Data;
                    response.IsDone = true;
                }
                if (i.type == HttpEventType.DownloadProgress) {
                    response.DownloadProgress = { Loaded: i.loaded, Total: i.total }
                }
                if (i.type == HttpEventType.UploadProgress) {
                    response.UploadProgress = { Loaded: i.loaded, Total: i.total }
                }
                return response;
            }));
    }
    //#endregion

    //#region Mappers
    private handleResponse(json: any): BaseResponse {
        this._baseResponse = this.initResponse();
        this._baseResponse.Status.Code = json.status.code;
        this._baseResponse.Status.Success = json.status.success;
        this._baseResponse.Status.Domain = json.status.domain;
        this._baseResponse.Status.Message = json.status.message;
        this._baseResponse.Status.Response = json.status.response;
        this._baseResponse.Result.Data = json.result.data;
        this._baseResponse.Result.PageInfo.TotalCount = json.result.pageInfo.totalCount;
        this._baseResponse.Result.PageInfo.TotalPage = json.result.pageInfo.totalPage;
        this._baseResponse.Result.PageInfo.Page = json.result.pageInfo.page;
        this._baseResponse.Result.PageInfo.PageSize = json.result.pageInfo.pageSize;
        return this._baseResponse;
    }
    private mapResponse<TModel extends IBaseModel<TModel>>(json: any, cls: { new(): TModel }): TModel | null {
        this.handleResponse(json);
        if (this._baseResponse.Result.Data)
            return new cls().mapModel(this._baseResponse.Result.Data);
        return null;
    }
    private mapResponseArray<TModel extends IBaseModel<TModel>>(json: any, cls: { new(): TModel }): Array<TModel> | null {
        this.handleResponse(json);
        var mappedArray = new Array<TModel>();
        if (this._baseResponse.Result.Data) {
            this._baseResponse.Result.Data.forEach((i: any) => {
                mappedArray.push(new cls().mapModel(i));
            });
            return mappedArray;
        }
        return null;
    }
    //#endregion

    //#region BaseResponse Methods
    private initResponse(): BaseResponse {
        if (!this._baseResponse)
            this._baseResponse = new BaseResponse();
        return this._baseResponse;
    }
    public getResponse(): BaseResponse {
        return this._baseResponse;
    }

    //#endregion Error Handler

    public catchError(v = true) {
        this._catchError = v;
    }

    private handleError(err: any) {
        if (this._catchError && this._exceptionHandler) {
            return this._exceptionHandler.handler(err);
        }
        return empty();
    }
    //#endregion

    //#region Helper Methods
    private operationUri(endPoint: string): string {
        return this._configuration.Host + this._configuration.EndPoint + endPoint;
    }
    //#endregion

}