import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { distinctUntilChanged, finalize, map, switchMap, tap } from "rxjs/operators";
import { VALIDATE_SELECT } from "src/app/consts/validate";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { FilterType, GenericBaseFilterModel } from "src/app/models/base-filter-model";
import { AssignedProgramUserInfo } from "src/app/models/program/assigned-program-users-info";
import { UserInfo } from "src/app/models/user/user-info";
import { ToastService } from "src/app/services/common/toastr-service";
import { ProgramService } from "src/app/services/program/program-service";
import { UserService } from "src/app/services/user/user-service";
import { ONgSelectComponent } from "../../shared/o-ng-select/o-ng-select.component";

@Component({
    selector: "o-assign-user-modal",
    templateUrl: './assign-user-modal.component.html',
    providers: [ProgramService, UserService],
    encapsulation: ViewEncapsulation.None
})
export class AssignUserModal implements OnInit, AfterViewInit, OnChanges {
    // Inputs
    @Input()
    public programId: number;
    @Input()
    public show: boolean = false;
    // Outputs
    @Output()
    public assignedUserChange = new EventEmitter();
    @Output()
    public showChange = new EventEmitter();
    // Publics
    public selectedUserId: number;
    public userInfoSearchLoading = false;
    public userInfoObservable: Observable<Array<UserInfo> | never[] | null>;
    public userSearchTermSubject = new Subject<string>();
    public validate = {
        select: VALIDATE_SELECT
    }
    // Privates
    private listedUsers: Array<UserInfo> | never[] | null;
    // View children
    @ViewChild('modal', { static: true })
    public modal: ElementRef;
    @ViewChild('userSelectElement', { static: true })
    public userSelectElement: ONgSelectComponent;
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;
    constructor(private _programService: ProgramService, private _userService: UserService, private _toastService: ToastService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.show) {
            if (changes.show.currentValue) {
                this.showModal();
            }
            if (!changes.show.currentValue) {
                this.hideModal();
            }
        }
    }

    ngOnInit(): void {
        this.loadUsers();
    }

    ngAfterViewInit(): void {
        $(this.modal.nativeElement).on('hidden.bs.modal', () => {
            this.hideModal();
        });
    }

    emitChangeEvent(e: AssignedProgramUserInfo) {
        this.assignedUserChange.emit(e);
    }

    emitShowEvent() {
        this.showChange.emit(this.show);
    }

    hideModal() {
        $(this.modal.nativeElement)
            .modal('hide');
        this.show = false;
        this.emitShowEvent();
    }

    showModal() {
        $(this.modal.nativeElement)
            .modal('show');
        this.show = true;
        this.emitShowEvent();
    }

    check() {
        return this.userSelectElement.check();
    }

    save() {
        if (this.check()) {
            let toast = this._toastService.continuing("Kullanıcı atanıyor", "Kullanıcı atama tamamlandı.", "Kullanıcı atanamadı.");
            let selectedUserInfo = this.listedUsers?.find(j => j.User.Id == this.selectedUserId);

            this.cardLoaderDirective.start();
            this._programService
                .assignUser({ ProgramId: this.programId, UserId: this.selectedUserId })
                .pipe(finalize(() => {
                    this.cardLoaderDirective.stop();
                }))
                .subscribe(
                    (i) => {
                        if (i) {
                            this.hideModal();
                            if (selectedUserInfo) {
                                let e = new AssignedProgramUserInfo();
                                e.Email = selectedUserInfo!.User.Email;
                                e.Name = selectedUserInfo!.UserProfile.Name;
                                e.Surname = selectedUserInfo!.UserProfile.Surname;
                                e.RelationId = i;
                                e.UserId = selectedUserInfo!.User.Id;
                                this.emitChangeEvent(e);
                            }
                            toast.success();
                        }
                    });
        }
    }

    private loadUsers() {
        this.userInfoObservable = this.userSearchTermSubject.pipe(
            distinctUntilChanged(),
            tap(() => this.userInfoSearchLoading = true),
            switchMap(i => {
                if (i) {
                    let model = new GenericBaseFilterModel<UserInfo>()
                        .addFilter(i => i.User.Email, i, FilterType.Contains, false)
                        .addFilter(i => i.UserProfile.Name, i, FilterType.Contains, false)
                        .addFilter(i => i.UserProfile.Surname, i, FilterType.Contains, false)
                        .toBaseFilterModel();
                    return this._userService.listFilterUsers(model)
                        .pipe(
                            finalize(() => this.userInfoSearchLoading = false),
                            tap((i) => this.listedUsers = i)
                        );
                }
                return of([])
                    .pipe(finalize(() => this.userInfoSearchLoading = false));
            })
        );
    }
}