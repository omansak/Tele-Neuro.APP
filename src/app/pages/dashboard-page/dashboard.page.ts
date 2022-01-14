import { AfterViewInit, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { NAVIGATION_ROUTE } from "src/app/consts/navigation";
import { Helper } from "src/app/helpers/helper";
import { PageInfo } from "src/app/models/base-model";
import { AssignedBrochureOfUserInfo } from "src/app/models/brochure/assigned-brochure-of-user-info";
import { CategoryInfo } from "src/app/models/category/category-info";
import { DocumentModel } from "src/app/models/document/document-model";
import { AssignedProgramOfUserInfo } from "src/app/models/program/assigned-program-of-user-info";
import { UserWorkProcessStats } from "src/app/models/utility/user-work-process-stats";
import { CategoryService } from "src/app/services/category/category-service";
import { ContentService } from "src/app/services/content/content-service";
import { RelationStatLogService } from "src/app/services/utility/relation-stat-log-service";
import { StatService } from "src/app/services/utility/stat-service";

@Component({
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardPage implements OnInit, AfterViewInit {
    //Publics
    public categories: Array<Array<CategoryInfo>>;
    public userStats: UserWorkProcessStats;
    public selfAssignedPrograms: Array<AssignedProgramOfUserInfo>;
    public selfAssignedBrochures: Array<AssignedBrochureOfUserInfo>;
    public selfAssignedProgramsPageInfo: PageInfo = new PageInfo(1, 10);
    public selfAssignedBrochuresPageInfo: PageInfo = new PageInfo(1, 10);

    constructor(
        private _categoryService: CategoryService,
        private _contentService: ContentService,
        private _statService: StatService,
        private _relationStatLogService: RelationStatLogService,
        private _router: Router) { }

    ngAfterViewInit(): void {
        this._relationStatLogService.insertRelationStatLog({ ActionKey: "DASHBOARD_OPENED" });
    }

    ngOnInit(): void {
        this.getSelfAssignedPrograms();
        this.getSelfAssignedBrochures();
        this.getCategories();
        this.getUserStats();
    }

    public onSelfAssignedProgramsPageInfoChanged(pageInfo: PageInfo) {
        this.selfAssignedProgramsPageInfo = pageInfo;
        this.getSelfAssignedPrograms();
    }

    public onSelfAssignedBrochuresPageInfoChanged(pageInfo: PageInfo) {
        this.selfAssignedBrochuresPageInfo = pageInfo;
        this.getSelfAssignedBrochures();
    }

    public navigateProgramContent(e: any) {
        this._router.navigate([NAVIGATION_ROUTE.ROUTE_PROGRAM.Route.replace(':id', e)]);
    }

    public toFormatSeconds(e: number) {
        return Helper.FormatSeconds(e);
    }

    public downloadBrochureDocument(e: AssignedBrochureOfUserInfo) {
        if (e?.Document) {
            window.open(e.Document.HostFullPath, "_blank");
            this._relationStatLogService.insertRelationStatLog({ ActionKey: "BROCHURE_OPENED", ActionArgument: e.BrochureId.toString() });
        }
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

    private getSelfAssignedBrochures() {
        this._contentService
            .selfAssignedBrochures(this.selfAssignedBrochuresPageInfo)
            .subscribe(
                (i) => {
                    if (i && i.length > 0) {
                        this.selfAssignedBrochures = i;
                        let response = this._contentService.getResponse();
                        this.selfAssignedBrochuresPageInfo.Page = response.Result.PageInfo.Page;
                        this.selfAssignedBrochuresPageInfo.PageSize = response.Result.PageInfo.PageSize;
                        this.selfAssignedBrochuresPageInfo.TotalPage = response.Result.PageInfo.TotalPage;
                        this.selfAssignedBrochuresPageInfo.TotalCount = response.Result.PageInfo.TotalCount;
                    }
                });
    }
}