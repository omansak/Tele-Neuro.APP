import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { CategoryModel } from 'src/app/models/category/category-model';

@Injectable()
export class CategoryService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
    public updateCategory(model: CategoryModel): Observable<number> {
        let form = new FormData();
        form.append("Id", model.Id?.toString());
        form.append("Name", model.Name);
        form.append("Description", model.Description);
        form.append("Image", model.Image);
        return super.httpPostValue<number>(environment.request.endPoints.category.updateCategory, model);
    }
}