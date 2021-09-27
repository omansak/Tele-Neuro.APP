import { IBaseModel } from "../base-model";
import { DocumentModel } from "../document/document-model";
import { CategoryModel } from "./category-model";

export class CategoryInfo implements IBaseModel<CategoryInfo> {
    Category: CategoryModel;
    Document: DocumentModel;
    ProgramCount: number
    
    constructor(category?: CategoryModel, document?: DocumentModel) {
        if (category)
            this.Category = category;
        if (document)
            this.Document = document;
    }

    mapModel(json: any): CategoryInfo {
        this.ProgramCount = json.programCount;
        if (json.category) {
            this.Category = new CategoryModel().mapModel(json.category);
        }
        if (json.document) {
            this.Document = new DocumentModel().mapModel(json.document);
        }
        return this;
    }
}
