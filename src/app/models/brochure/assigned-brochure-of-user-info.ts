import { IBaseModel } from "../base-model";
import { DocumentModel } from "../document/document-model";

export class AssignedBrochureOfUserInfo implements IBaseModel<AssignedBrochureOfUserInfo> {
    BrochureId: number;
    BrochureName: string;
    Document: DocumentModel;
    AssignDate: Date;
    mapModel(json: any): AssignedBrochureOfUserInfo {
        this.BrochureId = json.brochureId
        this.BrochureName = json.brochureName
        this.AssignDate = json.assignDate
        if (json.document) {
            this.Document = new DocumentModel().mapModel(json.document);
        }
        return this;
    }
}