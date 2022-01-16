import { IBaseModel } from "../base-model";

export class MessageRead implements IBaseModel<MessageRead> {
    Id: number;
    ConversationId: number;
    MessageId: number;
    UserId: number;
    IsRead: boolean;
    CreateDate: Date;
    UpdateDate: Date;

    mapModel(json: any): MessageRead {
        this.Id = json.id
        this.ConversationId = json.conversationId
        this.MessageId = json.messageId
        this.UserId = json.userId
        this.IsRead = json.isRead
        this.CreateDate = new Date(json.createDate);
        this.UpdateDate = new Date(json.updateDate);
        return this;
    }
}