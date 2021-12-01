import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { BaseComponent } from "src/app/components/base/base.component";
import { NAVIGATION_ROUTE } from "src/app/consts/navigation";
import { BaseResponse, PageInfo } from "src/app/models/base-model";
import { CategoryInfo } from "src/app/models/category/category-info";
import { ProgramInfo } from "src/app/models/program/program-info";
import { CategoryService } from "src/app/services/category/category-service";
import { ProgramService } from "src/app/services/program/program-service";

@Component({
    templateUrl: './category-detail.page.html',
    providers: [ProgramService, CategoryService]
})
export class CategoryDetailPage implements OnInit {
    // Publics
    public category: CategoryInfo;
    public programs: Array<ProgramInfo>
    public pageInfo: PageInfo = new PageInfo(1, 10);
    public get categoryId() {
        return this._activatedRoute.snapshot.params.id;
    }
    constructor(
        private _baseComponent: BaseComponent,
        private _activatedRoute: ActivatedRoute,
        private _programService: ProgramService,
        private _categoryService: CategoryService,
        private _router: Router) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        forkJoin({
            category: this._categoryService.getCategory(this.categoryId),
            programs: this.programsObservable()
        })
            .subscribe(i => {
                if (i.category) {
                    this.category = i.category;
                    this._baseComponent.setPageTitle(this._activatedRoute.snapshot.data.PageTitle?.replace("%s", this.category.Category.Name));
                    this._baseComponent.setPageHeader(this._activatedRoute.snapshot.data.PageHeader?.replace("%s", this.category.Category.Name));
                }
                else {
                    //TODO throw error
                    return;
                }
            })
    }

    navigateProgramContent(e: any) {
        this._router.navigate([NAVIGATION_ROUTE.ROUTE_PROGRAM.Route.replace(':id', e)]);
    }

    onPageInfoChanged(pageInfo: PageInfo) {
        this.pageInfo = pageInfo;
        this.loadData();
    }

    getPrograms() {
        this.programsObservable().subscribe()
    }

    private programsObservable() {
        return this._programService
            .listProgramsByCategory(this.categoryId, this.pageInfo)
            .pipe(tap(
                (i) => {
                    this.setPageInfo(this._programService.getResponse());
                    if (i && i.length > 0) {
                        this.programs = i;
                    }
                }
            ));
    }

    private setPageInfo(response: BaseResponse) {
        this.pageInfo.Page = response.Result.PageInfo.Page;
        this.pageInfo.PageSize = response.Result.PageInfo.PageSize;
        this.pageInfo.TotalPage = response.Result.PageInfo.TotalPage;
        this.pageInfo.TotalCount = response.Result.PageInfo.TotalCount;
    }
}