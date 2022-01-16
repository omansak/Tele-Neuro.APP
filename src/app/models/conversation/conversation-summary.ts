import { IBaseModel } from "../base-model";
import { ParticipantUserInfo } from "./participant-user-info";

export class ConversationSummary implements IBaseModel<ConversationSummary> {
    ConversationId: number;
    IsGroup: boolean;
    Name: string;
    LastMessage: string;
    LastMessageDate: Date | null;
    HasUnread: boolean;
    Participants: Array<ParticipantUserInfo>;

    mapModel(json: any): ConversationSummary {
        this.ConversationId = json.conversationId
        this.IsGroup = json.isGroup
        this.Name = json.name
        this.LastMessage = json.lastMessage
        this.LastMessageDate = json.lastMessageDate != null ? new Date(json.lastMessageDate) : null;
        this.HasUnread = json.hasUnread
        if (json.participants) {
            let arr: Array<ParticipantUserInfo> = [];
            (json.participants as Array<ParticipantUserInfo>).forEach(i => {
                arr.push(new ParticipantUserInfo().mapModel(i));
            });
            this.Participants = arr;
        }
        return this;
    }
}