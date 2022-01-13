import { IBaseModel } from "../base-model";

export class CreateConversationModel implements IBaseModel<CreateConversationModel> {
    Participants: number[];
    GroupName: string | null;

    mapModel(json: any): CreateConversationModel {
        this.Participants = json.participants;
        this.GroupName = json.groupName
        return this;
    }
}