import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { finalize } from "rxjs/operators";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { BaseResponse, PageInfo } from "src/app/models/base-model";
import { BrochureInfo } from "src/app/models/brochure/brochure-info";
import { AssignedProgramUserInfo as AssignedBrochureUserInfo } from "src/app/models/program/assigned-program-users-info";
import { BrochureService } from "src/app/services/brochure/brochure-service";
import { ToastService } from "src/app/services/common/toastr-service";

@Component({
    templateUrl: './brochure-user-management.page.html',
})
export class BrochureUserManagementPage implements AfterViewInit, OnInit {
    // Publics
    public get brochureId() {
        return +this._activatedRoute.snapshot.params.id;
    }
    public brochureInfo: BrochureInfo;
    public relatedUsers: Array<AssignedBrochureUserInfo>
    public pageInfo: PageInfo = new PageInfo(1, 10);
    // Modals
    public showStatusAssignUserOfBrochureModal: boolean = false;
    // View Children
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;
    constructor(private _activatedRoute: ActivatedRoute, private _brochureService: BrochureService, private _toastService: ToastService) { }

    ngOnInit(): void {
        this._brochureService
            .brochureInfo(this.brochureId)
            .subscribe(
                (i) => {
                    if (i) {
                        this.brochureInfo = i;
                    }
                });
    }

    ngAfterViewInit(): void {
        this.getRelatedUsers();
    }

    showAssignUserOfBrochureModal(e: any) {
        this.showStatusAssignUserOfBrochureModal = true;
    }
    
    getRelatedUsers() {
        this.cardLoaderDirective.start();
        this._brochureService
            .listAssignedUsers({ BrochureId: this.brochureId, PageInfo: this.pageInfo })
            .pipe(finalize(() => this.cardLoaderDirective.stop()))
            .subscribe(
                (i) => {
                    if (i && i.length > 0) {
                        this.relatedUsers = i;
                    }
                    else {
                        this.relatedUsers = new Array<AssignedBrochureUserInfo>();
                    }
                    this.setPageInfo(this._brochureService.getResponse());
                });
    }

    delete(e: AssignedBrochureUserInfo) {
        let toast = this._toastService.continuing("Kullanıcı broşürden kaldırılıyor.", "Kullanıcı broşürden kaldırıldı.", "Kullanıcı broşürden kaldırılamadı.");
        this.cardLoaderDirective.start();
        this._brochureService
            .deleteAssignedUser({
                BrochureId: this.brochureId,
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

    onAssignedUserChanged(e: AssignedBrochureUserInfo) {
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