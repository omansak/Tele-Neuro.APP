import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { CategoryModel } from 'src/app/models/category/category-model';
import { ExceptionHandler } from '../common/exception-handler';
import { PageInfo, ResponseProgressive } from 'src/app/models/base-model';
import { CategoryInfo } from 'src/app/models/category/category-info';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class CategoryService extends BaseService {
    private static Cache: { [key: string]: Observable<any>; } = {};

    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }
    public listCategories(pageInfo: PageInfo): Observable<Array<CategoryInfo> | null> {
        return super.httpPostArrayModel<CategoryInfo>(CategoryInfo, environment.request.endPoints.category.listCategories, pageInfo);
    }
    public listAllActiveCategories(): Observable<Array<CategoryInfo> | null> {
        if (!CategoryService.Cache[this.listAllActiveCategories.name]) {
            CategoryService.Cache[this.listAllActiveCategories.name] = super.httpPostArrayModel<CategoryInfo>(CategoryInfo, environment.request.endPoints.category.listActiveCategories, {})
                .pipe(shareReplay(1));
        }
        return CategoryService.Cache[this.listAllActiveCategories.name];
    }
    public listActiveCategories(pageInfo: PageInfo): Observable<Array<CategoryInfo> | null> {
        return super.httpPostArrayModel<CategoryInfo>(CategoryInfo, environment.request.endPoints.category.listActiveCategories, pageInfo);
    }
    public toggleCategoryStatus(id: number): Observable<boolean> {
        return super.httpPostValue<boolean>(environment.request.endPoints.category.toggleCategoryStatus, { id: id });
    }
    public updateCategoryProgressive(model: CategoryModel): Observable<ResponseProgressive<CategoryInfo>> {
        let form = new FormData();
        form.append("Id", (model.Id || 0).toString());
        form.append("Name", model.Name);
        form.append("Description", model.Description);
        form.append("IsActive", model.IsActive ? "true" : "false");
        if (model.Image.IsChanged) {
            form.append("Image", model.Image.File!);
        }
        return super.httpPostModelProgressive<CategoryInfo>(CategoryInfo, environment.request.endPoints.category.updateCategory, form);
    }
}