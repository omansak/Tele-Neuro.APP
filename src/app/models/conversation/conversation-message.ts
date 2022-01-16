import { IBaseModel } from "../base-model";
import { MessageRead } from "./message-read";


export class ConversationMessage implements IBaseModel<ConversationMessage>{
    ConversationId: number;
    UserId: number;
    MessageId: number;
    Message: string;
    CreateDate: Date | null;
    MessageReads: Array<MessageRead>;

    mapModel(json: any): ConversationMessage {
        this.ConversationId = json.conversationId
        this.UserId = json.userId
        this.MessageId = json.messageId
        this.Message = json.message
        this.CreateDate = json.createDate ? new Date(json.createDate) : null;
        if (json.messageReads) {
            let arr: Array<MessageRead> = [];
            (json.messageReads as Array<MessageRead>).forEach(i => {
                arr.push(new MessageRead().mapModel(i));
            });
            this.MessageReads = arr;
        }
        return this;
    }
}