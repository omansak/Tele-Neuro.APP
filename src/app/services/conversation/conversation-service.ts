import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ExceptionHandler } from '../common/exception-handler';
import { CreateConversationModel } from 'src/app/models/conversation/create-conversation-model';
import { ConversationSummary } from 'src/app/models/conversation/conversation-summary';
import { ConversationMessageModel } from 'src/app/models/conversation/conversation-message-model';
import { ConversationMessageInfo } from 'src/app/models/conversation/conversation-message-info';


@Injectable()
export class ConversationService extends BaseService {
    constructor(httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
    }

    public createConversation(model: CreateConversationModel): Observable<number> {
        return super.httpPostValue<number>(environment.request.endPoints.conversation.createConversation, model);
    }

    public userConversations(): Observable<Array<ConversationSummary> | null> {
        return super.httpGetArrayModel<ConversationSummary>(ConversationSummary, environment.request.endPoints.conversation.userConversations);
    }

    public conversationMessages(model: ConversationMessageModel): Observable<ConversationMessageInfo | null> {
        return super.httpPostModel<ConversationMessageInfo>(ConversationMessageInfo, environment.request.endPoints.conversation.conversationMessages, model);
    }

}