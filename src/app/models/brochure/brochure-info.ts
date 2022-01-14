import { IBaseModel } from "../base-model";
import { DocumentModel } from "../document/document-model";
import { BrochureModel } from "./brochure-model";

export class BrochureInfo implements IBaseModel<BrochureInfo> {
    Brochure: BrochureModel;
    Document: DocumentModel;

    mapModel(json: any): BrochureInfo {
        if (json.brochure) {
            this.Brochure = new BrochureModel().mapModel(json.brochure);
        }
        if (json.document) {
            this.Document = new DocumentModel().mapModel(json.document);
        }
        return this;
    }
}
