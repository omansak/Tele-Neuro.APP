import { convertActionBinding } from "@angular/compiler/src/compiler_util/expression_converter";
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { distinctUntilChanged, tap, switchMap, finalize } from "rxjs/operators";
import { ONgInputComponent } from "src/app/components/shared/o-ng-input/o-ng-input.component";
import { ONgSelectComponent } from "src/app/components/shared/o-ng-select/o-ng-select.component";
import { VALIDATE_SELECT, VALIDATE_TEXT } from "src/app/consts/validate";
import { GenericBaseFilterModel, FilterType } from "src/app/models/base-filter-model";
import { ConversationMessage } from "src/app/models/conversation/conversation-message";
import { ConversationSummary } from "src/app/models/conversation/conversation-summary";
import { CreateConversationModel } from "src/app/models/conversation/create-conversation-model";
import { AuthUserModel } from "src/app/models/user/auth-user-model";
import { UserInfo } from "src/app/models/user/user-info";
import { AuthenticationService } from "src/app/services/authentication/authentication-service";
import { ToastService } from "src/app/services/common/toastr-service";
import { ConversationService } from "src/app/services/conversation/conversation-service";
import { UserService } from "src/app/services/user/user-service";

@Component({
    templateUrl: './conversation.page.html',
    styleUrls: ['./conversation.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConversationPage implements OnInit {
    // New Conversation Publics
    public showWewConversation: boolean = false;
    public newConversationSelectedUserIds: Array<number> | null;
    public newConversationGroupName: string | null;
    public newConversationUserInfoSearchLoading = false;
    public newConversationUserInfoObservable: Observable<Array<UserInfo> | never[] | null>;
    public newConversationUserSearchTermSubject = new Subject<string>();
    // Conversation Publics
    public conversations: Array<ConversationSummary>;

    public validate = {
        select: VALIDATE_SELECT,
        text: VALIDATE_TEXT,
    }
    // Privates
    private userInfo: AuthUserModel | null;
    private listedUsers: Array<UserInfo> | never[] | null;
    private activeConversation: ConversationSummary;
    private conversationMessage: Array<{ Id: number, Messages: Array<ConversationMessage>, Cursor: Date | null }> = [];
    // View children
    @ViewChild('modal')
    public modal: ElementRef;
    @ViewChild('newConversationUserSelectElement')
    public newConversationUserSelectElement: ONgSelectComponent;
    @ViewChild('newConversationGroupNameElement')
    public newConversationGroupNameElement: ONgInputComponent;

    constructor(
        private _userService: UserService,
        private _conversationService: ConversationService,
        private _toastService: ToastService,
        private _authenticationService: AuthenticationService) {

    }
    ngOnInit(): void {
        this.userInfo = this._authenticationService.getUser()
        this.loadUserConversations();
    }

    toggleMenu() {
        $('.ms-menu').toggleClass('toggled');
    }

    hideNewConversationModal() {
        $(this.modal.nativeElement).modal('hide');
        this.showWewConversation = false;
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
                        toast.success();
                    }
                })
        }
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

    setActiveConversation(e: ConversationSummary) {
        let conversationMessage = this.conversationMessage.find(i => i.Id == e.ConversationId);
        if (!conversationMessage) {
            this.getConversationMessage(e.ConversationId);
        }
        this.activeConversation = e;
    }

    isActiveConversation(e: ConversationSummary) {
        return e.ConversationId == this.activeConversation?.ConversationId;
    }

    private getConversationMessage(conversationId: number) {
        if (conversationId) {
            let conversationMessage = this.conversationMessage.find(i => i.Id == conversationId);
            let cursor: Date | null = conversationMessage && conversationMessage.Cursor ? conversationMessage.Cursor : null;

            this._conversationService
                .conversationMessages({ ConversationId: conversationId, Cursor: cursor })
                .subscribe(
                    (i) => {
                        if (i) {
                            if (conversationMessage) {
                                conversationMessage.Cursor = i.Cursor;
                                conversationMessage.Messages.unshift(...i.ConversationMessage);
                            }
                            else {
                                this.conversationMessage.push({ Id: conversationId, Cursor: i.Cursor, Messages: i.ConversationMessage ?? [] })
                            }
                        }
                    }

                )
        }
    }

    private loadUserConversations() {
        this._conversationService
            .userConversations()
            .subscribe(
                (i) => {
                    if (i) {
                        this.conversations = i;
                    }
                    else {
                        this.conversations = [];
                    }
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
}