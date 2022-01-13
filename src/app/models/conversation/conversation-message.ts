import { IBaseModel } from "../base-model";
import { MessageRead } from "./message-read";


export class ConversationMessage implements IBaseModel<ConversationMessage>{
    MessageId: number;
    Message: string;
    CreateDate: Date | string;
    MessageReads: Array<MessageRead>;

    mapModel(json: any): ConversationMessage {
        this.MessageId = json.messageId
        this.Message = json.message
        this.CreateDate = json.createDate
        if (json.messageReads) {
            let arr: Array<MessageRead> = [];
            (json.participants as Array<MessageRead>).forEach(i => {
                arr.push(new MessageRead().mapModel(i));
            });
            this.MessageReads = arr;
        }
        return this;
    }
}