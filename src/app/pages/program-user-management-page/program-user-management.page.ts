import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { finalize } from "rxjs/operators";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { BaseResponse, PageInfo } from "src/app/models/base-model";
import { AssignedProgramUserInfo } from "src/app/models/program/assigned-program-users-info";
import { ProgramInfo } from "src/app/models/program/program-info";
import { ToastService } from "src/app/services/common/toastr-service";
import { ProgramService } from "src/app/services/program/program-service";

@Component({
    templateUrl: './program-user-management.page.html',
    providers: [ProgramService, ToastService]
})
export class ProgramUserManagementPage implements AfterViewInit, OnInit {
    // Publics
    public get programId() {
        return +this._activatedRoute.snapshot.params.id;
    }
    public programInfo: ProgramInfo;
    public relatedUsers: Array<AssignedProgramUserInfo>
    public pageInfo: PageInfo = new PageInfo(1, 10);
    // Modals
    public showStatusAssignUserOfProgramModal: boolean = false;
    // View Children
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;
    constructor(private _activatedRoute: ActivatedRoute, private _programService: ProgramService, private _toastService: ToastService) { }

    ngOnInit(): void {
        this._programService
            .programInfo(this.programId)
            .subscribe(
                (i) => {
                    if (i) {
                        this.programInfo = i;
                    }
                });
    }

    ngAfterViewInit(): void {
        this.getRelatedUsers();
    }

    showAssignUserOfProgramModal(e: any) {
        this.showStatusAssignUserOfProgramModal = true;
    }

    getRelatedUsers() {
        this.cardLoaderDirective.start();
        this._programService
            .listAssignedUsers({ ProgramId: this.programId, PageInfo: this.pageInfo })
            .pipe(finalize(() => this.cardLoaderDirective.stop()))
            .subscribe(
                (i) => {
                    if (i && i.length > 0) {
                        this.relatedUsers = i;
                    }
                    else {
                        this.relatedUsers = new Array<AssignedProgramUserInfo>();
                    }
                    this.setPageInfo(this._programService.getResponse());
                });
    }

    delete(e: AssignedProgramUserInfo) {
        let toast = this._toastService.continuing("Kullanıcı programdan kaldırılıyor.", "Kullanıcı programdan kaldırıldı.", "Kullanıcı programdan kaldırılamadı.");
        this.cardLoaderDirective.start();
        this._programService
            .deleteAssignedUser({
                ProgramId: this.programId,
                UserId: e.UserId
            })
            .pipe(finalize(() => this.cardLoaderDirective.stop()))
            .subscribe(
                (i) => {
                    if (i) {
                        this.relatedUsers = this.relatedUsers.filter(i => i != e);
                        toast.success();
                    }
                });
    }

    onAssignedUserChanged(e: AssignedProgramUserInfo) {
        this.relatedUsers.unshift(e);
    }

    onPageInfoChanged(pageInfo: PageInfo) {
        this.pageInfo = pageInfo;
        this.getRelatedUsers();
    }

    setPageInfo(response: BaseResponse) {
        this.pageInfo.Page = response.Result.PageInfo.Page;
        this.pageInfo.PageSize = response.Result.PageInfo.PageSize;
        this.pageInfo.TotalPage = response.Result.PageInfo.TotalPage;
        this.pageInfo.TotalCount = response.Result.PageInfo.TotalCount;
    }
}