import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { NAVIGATION_ROUTE } from "src/app/consts/navigation";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { BaseResponse, PageInfo } from "src/app/models/base-model";
import { ProgramInfo } from "src/app/models/program/program-info";
import { ToastService } from "src/app/services/common/toastr-service";
import { ProgramService } from "src/app/services/program/program-service";

@Component({
    templateUrl: './program-management.page.html',
    providers: [ProgramService, ToastService]
})
export class ProgramManagementPage implements AfterViewInit {
    // Publics
    public programs: Array<ProgramInfo>
    public pageInfo: PageInfo = new PageInfo(1, 10);
    public forEditProgram: ProgramInfo | undefined;
    public selectedProgramId: number;
    public get totalProgramCount(): number {
        return this.programs?.filter(i => i.Program.IsActive).length ?? 0;
    };
    // Modals
    public showStatusUpdateProgramModal: boolean = false;
    public showStatusAssignExerciseOfProgramModal: boolean = false;
    public showStatusAssignUserOfProgramModal: boolean = false;
    public showStatusExercisesOfProgramModal: boolean = false;
    // View Children
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;
    constructor(private _programService: ProgramService, private _toastService: ToastService, private _router: Router) { }

    ngAfterViewInit(): void {
        this.getPrograms();
    }

    showUpdateProgramModal(e?: any) {
        this.forEditProgram = e;
        this.showStatusUpdateProgramModal = true;
    }

    showAssignExerciseOfProgramModal(e: any) {
        this.selectedProgramId = e;
        this.showStatusAssignExerciseOfProgramModal = true;
    }

    showAssignUserOfProgramModal(e: any) {
        this.selectedProgramId = e;
        this.showStatusAssignUserOfProgramModal = true;
    }

    showExercisesOfProgramModal(e: any) {
        this.selectedProgramId = e;
        this.showStatusExercisesOfProgramModal = true;
    }
    

    navigateProgramContent(e: any) {
        this._router.navigate([NAVIGATION_ROUTE.ROUTE_PROGRAM.Route.replace(':id', e)]);
    }

    getPrograms() {
        this.cardLoaderDirective.start();
        this._programService
            .listPrograms(this.pageInfo)
            .pipe(finalize(() => this.cardLoaderDirective.stop()))
            .subscribe(
                (i) => {
                    if (i && i.length > 0) {
                        this.programs = i;
                    }
                    else {
                        this.programs = new Array<ProgramInfo>();
                    }
                    this.setPageInfo(this._programService.getResponse());
                });
    }

    toggleExerciseStatus(id: number) {
        let toast = this._toastService.continuing("Program durumu güncelleniyor.", "Program durumu değiştirildi.", "Program güncellenemedi.");
        this.cardLoaderDirective.start();
        this._programService
            .toggleProgramStatus(id)
            .pipe(finalize(() => this.cardLoaderDirective.stop()))
            .subscribe(
                (i) => {
                    if (i) {
                        let exercise = this.programs.find(i => i.Program.Id == id);
                        if (exercise) {
                            exercise.Program.IsActive = !exercise.Program.IsActive;
                            toast.success();
                        }
                        else {
                            toast.error("Program bulunamadı");
                        }
                    }
                });
    }

    onProgramUpdated(val: any) {
        if (val && val instanceof ProgramInfo) {
            let programIndex = this.programs.findIndex(i => i.Program.Id == val.Program.Id)
            if (programIndex >= 0) {
                this.programs[programIndex] = val;
            }
            else {
                this.programs.unshift(val);
            }
        }
    }

    onPageInfoChanged(pageInfo: PageInfo) {
        this.pageInfo = pageInfo;
        this.getPrograms();
    }

    setPageInfo(response: BaseResponse) {
        this.pageInfo.Page = response.Result.PageInfo.Page;
        this.pageInfo.PageSize = response.Result.PageInfo.PageSize;
        this.pageInfo.TotalPage = response.Result.PageInfo.TotalPage;
        this.pageInfo.TotalCount = response.Result.PageInfo.TotalCount;
    }
}