import { IBaseModel } from "../base-model";
export class DocumentModel implements IBaseModel<DocumentModel> {
    Id: number;
    Guid: string;
    Name: string;
    FileName: string;
    Extension: string;
    ContentType: string;
    Directory: string;
    Path: string;
    PhysicalBase: string;
    PhysicalFullPath: string;
    HostBase: string;
    HostFullPath: string;
    Type: number;
    CreatedDate: Date | string | null;
    IsActive: boolean;

    mapModel(json: any): DocumentModel {
        this.Id = json.id
        this.Guid = json.guid
        this.Name = json.name
        this.FileName = json.fileName
        this.Extension = json.extension
        this.ContentType = json.contentType
        this.Directory = json.directory
        this.Path = json.path
        this.PhysicalBase = json.physicalBase
        this.PhysicalFullPath = json.physicalFullPath
        this.HostBase = json.hostBase
        this.HostFullPath = json.hostFullPath
        this.Type = json.type
        this.CreatedDate = json.createdDate
        this.IsActive = json.isActive
        return this;
    }
}
