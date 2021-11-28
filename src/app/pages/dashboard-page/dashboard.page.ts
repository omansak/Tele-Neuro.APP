import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { NAVIGATION_ROUTE } from "src/app/consts/navigation";
import { Helper } from "src/app/helpers/helper";
import { PageInfo } from "src/app/models/base-model";
import { CategoryInfo } from "src/app/models/category/category-info";
import { AssignedProgramOfUserInfo } from "src/app/models/program/assigned-program-of-user-info";
import { UserWorkProcessStats } from "src/app/models/utility/user-work-process-stats";
import { CategoryService } from "src/app/services/category/category-service";
import { ToastService } from "src/app/services/common/toastr-service";
import { ContentService } from "src/app/services/content/content-service";
import { StatService } from "src/app/services/utility/stat-service";

@Component({
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    providers: [ToastService, CategoryService, ContentService, StatService],
    encapsulation: ViewEncapsulation.None
})
export class DashboardPage implements OnInit {
    //Publics
    public categories: Array<Array<CategoryInfo>>;
    public selfAssignedPrograms: Array<AssignedProgramOfUserInfo>;
    public userStats: UserWorkProcessStats;
    public selfAssignedProgramsPageInfo: PageInfo = new PageInfo(1, 10);

    constructor(
        private _categoryService: CategoryService,
        private _contentService: ContentService,
        private _statService: StatService,
        private _router: Router) { }

    ngOnInit(): void {
        this.getSelfAssignedPrograms();
        this.getCategories();
        this.getUserStats();
    }

    public onSelfAssignedProgramsPageInfoChanged(pageInfo: PageInfo) {
        this.selfAssignedProgramsPageInfo = pageInfo;
        this.getSelfAssignedPrograms();
    }

    public navigateProgramContent(e: any) {
        this._router.navigate([NAVIGATION_ROUTE.ROUTE_PROGRAM.Route.replace(':id', e)]);
    }

    public toFormatSeconds(e: number) {
        return Helper.FormatSeconds(e);
    }

    private getCategories() {
        this._categoryService
            .listAllActiveCategories()
            .subscribe(
                (i) => {
                    if (i && i.length > 0) {
                        this.categories = Helper.ChunkArray(i, 3);
                    }
                });
    }

    private getUserStats() {
        this._statService
            .userStats()
            .subscribe(
                (i) => {
                    if (i) {
                        this.userStats = i
                    }
                });
    }

    private getSelfAssignedPrograms() {
        this._contentService
            .selfAssignedPrograms(this.selfAssignedProgramsPageInfo)
            .subscribe(
                (i) => {
                    if (i && i.length > 0) {
                        this.selfAssignedPrograms = i;
                        let response = this._contentService.getResponse();
                        this.selfAssignedProgramsPageInfo.Page = response.Result.PageInfo.Page;
                        this.selfAssignedProgramsPageInfo.PageSize = response.Result.PageInfo.PageSize;
                        this.selfAssignedProgramsPageInfo.TotalPage = response.Result.PageInfo.TotalPage;
                        this.selfAssignedProgramsPageInfo.TotalCount = response.Result.PageInfo.TotalCount;
                    }
                });
    }
}