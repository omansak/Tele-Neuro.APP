import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalR";
import { Subject } from "rxjs";
import { ConversationMessage } from "src/app/models/conversation/conversation-message";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../authentication/authentication-service";

@Injectable()
export class NotificationHubService {
    private _messageSubject: Subject<ConversationMessage | null>;
    private _conversationReadSubject: Subject<{ UserId: number, ConversationId: number } | null>;
    private _hubConnection: signalR.HubConnection;
    private retryCount = 0;

    constructor(private _authenticationService: AuthenticationService) {
        this._messageSubject = new Subject<ConversationMessage | null>();
        this._conversationReadSubject = new Subject<{ UserId: number, ConversationId: number } | null>();
        this.initConnection();
    }

    public newMessageObservable() {
        return this._messageSubject.asObservable();
    }

    public conversationReadObservable() {
        return this._conversationReadSubject.asObservable();
    }

    public async startConnection() {
        try {
            await this._hubConnection.start();
        } catch (err) {
            if (this.retryCount < 5) {
                setTimeout(async () => {
                    this.retryCount++;
                    await this.startConnection();
                }, 5000);
            }
        }
    }

    private initConnection() {
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.request.host}${environment.request.hubEndpoint}${environment.request.endPoints.notificationHub}`, {
                accessTokenFactory: () => this._authenticationService.getUser()?.Token ?? ""
            })
            .configureLogging(signalR.LogLevel.Critical)
            .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
            .build();

        this._hubConnection.onreconnecting((error) => {
            console.error(`Connection lost due to error "${error}". Reconnecting.`);
        });

        this._hubConnection.onreconnected(() => {
            console.info('Connection reestablished. Connected.');
        });

        this._hubConnection.on("NotifyNewMessage", (i) => {
            if (i) {
                this._messageSubject.next(new ConversationMessage().mapModel(i));
            }
        });

        this._hubConnection.on("NotifyReadConversation", (i, j) => {
            if (i) {
                this._conversationReadSubject.next({ UserId: i, ConversationId: j })
            }
        });
    }
}