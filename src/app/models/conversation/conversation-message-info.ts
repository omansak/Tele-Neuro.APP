import { IBaseModel } from "../base-model";
import { ConversationMessage } from "./conversation-message";


export class ConversationMessageInfo implements IBaseModel<ConversationMessageInfo> {
    ConversationMessage: Array<ConversationMessage>;
    Cursor: Date | null;

    mapModel(json: any): ConversationMessageInfo {
        this.Cursor = json.cursor;
        if (json.conversationMessage) {
            let arr: Array<ConversationMessage> = [];
            (json.participants as Array<ConversationMessage>).forEach(i => {
                arr.push(new ConversationMessage().mapModel(i));
            });
            this.ConversationMessage = arr;
        }

        return this;
    }
}