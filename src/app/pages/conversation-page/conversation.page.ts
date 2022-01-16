import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Observable, of, Subject, Subscription } from "rxjs";
import { distinctUntilChanged, tap, switchMap, finalize } from "rxjs/operators";
import { ONgInputComponent } from "src/app/components/shared/o-ng-input/o-ng-input.component";
import { ONgSelectComponent } from "src/app/components/shared/o-ng-select/o-ng-select.component";
import { VALIDATE_SELECT, VALIDATE_TEXT } from "src/app/consts/validate";
import { GenericBaseFilterModel, FilterType } from "src/app/models/base-filter-model";
import { ConversationMessage } from "src/app/models/conversation/conversation-message";
import { ConversationSummary } from "src/app/models/conversation/conversation-summary";
import { CreateConversationModel } from "src/app/models/conversation/create-conversation-model";
import { InsertMessageModel } from "src/app/models/conversation/insert-message-model";
import { MessageRead } from "src/app/models/conversation/message-read";
import { AuthUserModel } from "src/app/models/user/auth-user-model";
import { UserInfo } from "src/app/models/user/user-info";
import { AuthenticationService } from "src/app/services/authentication/authentication-service";
import { ToastService } from "src/app/services/common/toastr-service";
import { ConversationService } from "src/app/services/conversation/conversation-service";
import { NotificationHubService } from "src/app/services/notification-hub/notification-hub-service";
import { UserService } from "src/app/services/user/user-service";

@Component({
    templateUrl: './conversation.page.html',
    styleUrls: ['./conversation.page.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationPage implements OnInit, OnDestroy {
    // New Conversation Publics
    public showWewConversation: boolean = false;
    public newConversationSelectedUserIds: Array<number> | null;
    public newConversationGroupName: string | null;
    public newConversationUserInfoSearchLoading = false;
    public newConversationUserInfoObservable: Observable<Array<UserInfo> | never[] | null>;
    public newConversationUserSearchTermSubject = new Subject<string>();

    // Conversation Publics
    public activeConversation: ConversationSummary;
    public insertMessageText: string;
    public conversations: Array<ConversationSummary>;

    // Publics
    public ownerId: number;
    public validate = {
        select: VALIDATE_SELECT,
        text: VALIDATE_TEXT,
    }

    // Privates
    private conversationMessages: Array<{ Id: number, Messages: Array<ConversationMessage>, Cursor: Date | null }> = [];
    private userInfo: AuthUserModel | null;
    private listedUsers: Array<UserInfo> | never[] | null;

    // Subscriptions
    private handleNewMessage$: Subscription;
    private handleConversationRead$: Subscription;

    // View children
    @ViewChild('modal')
    public modal: ElementRef;
    @ViewChild('newConversationUserSelectElement')
    public newConversationUserSelectElement: ONgSelectComponent;
    @ViewChild('newConversationGroupNameElement')
    public newConversationGroupNameElement: ONgInputComponent;
    @ViewChild('insertMessageElement')
    public insertMessageElement: ONgInputComponent;
    @ViewChild('messageBoxElement')
    public messageBoxElement: ElementRef;
    @ViewChild('messageElement')
    public messageElement: ElementRef;

    constructor(
        private _userService: UserService,
        private _conversationService: ConversationService,
        private _toastService: ToastService,
        private _authenticationService: AuthenticationService,
        private _notificationHubService: NotificationHubService,
        private _changeDetectionRef: ChangeDetectorRef) {

        this.handleNewMessage();
        this.handleConversationRead();
    }

    ngOnDestroy(): void {
        if (this.handleNewMessage$)
            this.handleNewMessage$.unsubscribe()

        if (this.handleConversationRead$)
            this.handleConversationRead$.unsubscribe()
    }

    ngOnInit(): void {
        this.userInfo = this._authenticationService.getUser()
        this.ownerId = this.userInfo!.Id;
        this.loadUserConversations();
    }

    toggleMenu() {
        $('.ms-menu').toggleClass('toggled');
    }

    hideNewConversationModal() {
        $(this.modal.nativeElement).modal('hide');
        this.showWewConversation = false;
    }

    isAllRead(e: Array<MessageRead>) {
        console.log(123);
        
        return !e?.some(i => i.IsRead == false);
    }

    getUserNameOnConversation(userId: number) {
        let user = this.activeConversation.Participants?.find(i => i.User.Id == userId);
        return `${user?.UserProfile.Name} ${user?.UserProfile.Surname}`
    }

    getConversationName(e: ConversationSummary) {
        if (e) {
            if (e.IsGroup || e.Name) {
                return e.Name;
            }
            if (this.userInfo) {
                let user = e.Participants.find(i => i.User?.Id != this.userInfo?.Id);
                return `${user?.UserProfile.Name} ${user?.UserProfile.Surname}`
            }
        }
        return "";
    }

    getActiveConversationMessages() {
        return this.conversationMessages.find(i => i.Id == this.activeConversation.ConversationId)?.Messages;
    }

    showNewConversationModal() {
        if (!this.newConversationUserInfoObservable) {
            this.initConversationSearchUsers();
        }

        this.newConversationSelectedUserIds = null;
        this.listedUsers = null;
        this.newConversationGroupName = null;
        this.showWewConversation = true;

        setTimeout($(this.modal.nativeElement).modal('show'), 128);
    }

    setActiveConversation(e: ConversationSummary) {
        let conversationMessage = this.conversationMessages.find(i => i.Id == e.ConversationId);
        if (!conversationMessage) {
            this.getConversationMessage(e.ConversationId);
        }
        else {
            this.readConversationAllMessages(e.ConversationId);
            this.messageBoxScrollToBottom();
        }
        this.activeConversation = e;
    }

    insertMessage() {
        if (this.insertMessageElement.check() && this.activeConversation && this.activeConversation.ConversationId > 0) {
            this.sendMessage({ ConversationId: this.activeConversation.ConversationId, Message: this.insertMessageText });
        }
    }

    createConversation() {
        if (this.newConversationUserSelectElement.check() && (!this.newConversationGroupNameElement || this.newConversationGroupNameElement.check())) {
            let createConversationModel = new CreateConversationModel();
            createConversationModel.GroupName = this.newConversationGroupName;
            createConversationModel.Participants = this.newConversationSelectedUserIds!;

            let toast = this._toastService.continuing("Yeni mesajlaşma oluşturuluyor", "Yeni mesajlaşma oluşturuldu", "Yeni mesajlaşma oluşturulamadı");
            this._conversationService
                .createConversation(createConversationModel)
                .subscribe(i => {
                    if (i) {
                        if (this.conversations.findIndex(j => j.ConversationId == i.ConversationId) < 0) {
                            if (i.LastMessage == null && i.LastMessageDate == null) {
                                i.LastMessageDate = new Date();
                            }
                            this.conversations.push(i);
                            this.sortConversationSummaries();
                            this.setActiveConversation(i);
                        }
                        this.hideNewConversationModal();
                        toast.success();
                        this._changeDetectionRef.detectChanges();
                    }
                })
        }
    }

    onMessageBoxScroll() {
        if (this.messageBoxElement?.nativeElement && this.messageBoxElement.nativeElement.scrollTop === 0) {
            if (this.activeConversation) {
                this.getConversationMessage(this.activeConversation?.ConversationId)
            }
        }
    }

    refresh() {
        location.reload();
    }

    private sendMessage(e: InsertMessageModel) {
        if (e) {
            this._conversationService
                .insertMessage(e)
                .subscribe(
                    (i) => {
                        if (i) {
                            this.insertMessageText = "";
                            // Update Conversation
                            this.insertMessageToConversation(i);
                        }
                        else {
                            this._toastService.error("Mesaj gönderilemedi");
                        }
                    })
        }
    }

    private getConversationMessage(conversationId: number) {
        if (conversationId) {
            let conversationSummary = this.conversations.find(i => i.ConversationId == conversationId);
            let conversationMessage = this.conversationMessages.find(i => i.Id == conversationId);
            let cursor: Date | null = conversationMessage && conversationMessage.Cursor ? conversationMessage.Cursor : null;

            if (conversationSummary == null || conversationMessage && conversationMessage.Cursor == null)
                return;

            this._conversationService
                .conversationMessages({ ConversationId: conversationId, Cursor: cursor })
                .subscribe(
                    (i) => {
                        if (i) {
                            if (conversationMessage) {
                                let lastMessageElement = this.messageElement;
                                conversationMessage.Cursor = i.Cursor;
                                conversationMessage.Messages.unshift(...i.ConversationMessage);
                                setTimeout(() => { this.messageBoxElement.nativeElement.scrollTop = lastMessageElement.nativeElement.offsetTop - (this.messageBoxElement.nativeElement.offsetHeight / 2); });
                            }
                            else {
                                // Push messages
                                this.conversationMessages.push({ Id: conversationId, Cursor: i.Cursor, Messages: i.ConversationMessage ?? [] })

                                //Read conversation message
                                this.readConversationAllMessages(conversationId);

                                //Update scroll
                                this.messageBoxScrollToBottom();
                            }
                        }
                        this._changeDetectionRef.detectChanges();
                    }
                )
        }
    }

    private loadUserConversations(onComplete: () => void = () => { }) {
        this._conversationService
            .userConversations()
            .subscribe(
                (i) => {
                    if (i) {
                        this.conversations = i;
                        this.sortConversationSummaries();
                    }
                    else {
                        this.conversations = [];
                    }
                    onComplete();
                    this._changeDetectionRef.detectChanges();
                },
                (err) => {
                    this._toastService.error("Konuşmalar yüklenirken hata oluştu");
                })
    }

    private initConversationSearchUsers() {
        this.newConversationUserInfoObservable = this.newConversationUserSearchTermSubject.pipe(
            distinctUntilChanged(),
            tap(() => this.newConversationUserInfoSearchLoading = true),
            switchMap(i => {
                if (i) {
                    let model = new GenericBaseFilterModel<UserInfo>()
                        .addFilter(i => i.User.Email, i, FilterType.Contains, false)
                        .addFilter(i => i.UserProfile.Name, i, FilterType.Contains, false)
                        .addFilter(i => i.UserProfile.Surname, i, FilterType.Contains, false)
                        .toBaseFilterModel();
                    return this._userService.listFilterUsers(model)
                        .pipe(
                            finalize(() => this.newConversationUserInfoSearchLoading = false),
                            tap((i) => this.listedUsers = i)
                        );
                }
                return of([])
                    .pipe(finalize(() => this.newConversationUserInfoSearchLoading = false));
            })
        );
    }

    private sortConversationSummaries() {
        this.conversations = this.conversations.sort((a, b) => (a.LastMessageDate ?? 0) < (b.LastMessageDate ?? 0) ? 1 : -1);
    }

    private messageBoxScrollToBottom() {
        setTimeout(() => {
            if (this.messageBoxElement?.nativeElement) {
                this.messageBoxElement.nativeElement.scrollTop = this.messageBoxElement.nativeElement.scrollHeight;
            }
        }, 64)
    }

    private handleNewMessage() {
        this.handleNewMessage$ = this._notificationHubService.newMessageObservable().subscribe(i => {
            if (i) {
                this.insertMessageToConversation(i);
            }
        });
    }

    private handleConversationRead() {
        this.handleConversationRead$ = this._notificationHubService.conversationReadObservable().subscribe(i => {
            if (i) {
                let conversationMessage = this.conversationMessages.find(j => j.Id == i.ConversationId);
                if (conversationMessage && conversationMessage.Messages) {
                    conversationMessage.Messages.map(j => {
                        let participant = j.MessageReads?.find(k => k.UserId == i.UserId);
                        if (participant) {
                            participant.IsRead = true;
                            participant.UpdateDate = new Date();
                        }
                    });
                    this._changeDetectionRef.detectChanges();
                }
            }
        });
    }

    private insertMessageToConversation(e: ConversationMessage) {
        let conversationSummary = this.conversations.find(j => j.ConversationId == e.ConversationId)!;
        if (conversationSummary) {
            conversationSummary.LastMessage = e.Message
            conversationSummary.LastMessageDate = e.CreateDate;
            this.sortConversationSummaries();

            // Push Message to conversation
            let conversation = this.conversationMessages.find(j => j.Id == e.ConversationId);
            if (conversation) {
                conversation.Messages.push(e);
            }

            //Update scroll to bottom & read message
            if (this.activeConversation?.ConversationId == conversationSummary.ConversationId) {
                this.readConversationAllMessages(conversationSummary.ConversationId, true);
                this.messageBoxScrollToBottom();
            }
            else {
                // Set unread flag when conversation currently is not active
                conversationSummary.HasUnread = true;
            }
        }
        else {
            this.loadUserConversations();
        }
        this._changeDetectionRef.detectChanges();
    }

    private readConversationAllMessages(conversationId: number, forceRead: boolean = false) {
        let conversationSummary = this.conversations.find(j => j.ConversationId == conversationId);
        if (conversationSummary && (forceRead || conversationSummary.HasUnread)) {
            this._conversationService.readConversationAllMessages(conversationId).subscribe(i => {
                if (i) {
                    conversationSummary!.HasUnread = false;
                    let conversationMessages = this.conversationMessages.find(j => j.Id == conversationId);
                    if (conversationMessages && conversationMessages.Messages) {
                        conversationMessages.Messages.forEach(j => {
                            let participant = j.MessageReads.find(k => k.UserId == this.ownerId);
                            if (participant) {
                                participant.IsRead = true;
                                participant.UpdateDate = new Date();
                            }
                        });
                    }
                }
                this._changeDetectionRef.detectChanges();
            });
        }
    }
}