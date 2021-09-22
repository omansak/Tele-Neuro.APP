import { IBaseModel } from "../base-model";
import { CategoryModel } from "../category/category-model";
import { ProgramModel } from "./program-model";

export class ProgramInfo implements IBaseModel<ProgramInfo> {
    Program: ProgramModel;
    Category: CategoryModel;

    mapModel(json: any): ProgramInfo {
        if (json.program) {
            this.Program = new ProgramModel().mapModel(json.program);
        }
        if (json.category) {
            this.Category = new CategoryModel().mapModel(json.category);
        }
        return this;
    }
}
