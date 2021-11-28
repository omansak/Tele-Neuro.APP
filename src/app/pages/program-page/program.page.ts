import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, of } from "rxjs";
import { finalize } from "rxjs/operators";
import { ConvertNumberToFileType, FileType, LogLevel } from "src/app/consts/enums";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { Helper } from "src/app/helpers/helper";
import { CategoryInfo } from "src/app/models/category/category-info";
import { DocumentModel } from "src/app/models/document/document-model";
import { ProgramAssignedExerciseInfo } from "src/app/models/program/program-assigned-exercise-info";
import { ProgramInfo } from "src/app/models/program/program-info";
import { ContentService } from "src/app/services/content/content-service";
import { RelationStatLogService } from "src/app/services/utility/relation-stat-log-service";
import { StatService } from "src/app/services/utility/stat-service";
import { VimeoService } from "src/app/services/vimeo/vimeo-service";

@Component({
    templateUrl: './program.page.html',
    styleUrls: ['./program.page.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ContentService, RelationStatLogService, StatService, VimeoService]
})
export class ProgramPage implements AfterViewInit {

    //Publics
    public programInfo: ProgramInfo | null;
    public assignedExercises: Array<ProgramAssignedExerciseInfo>;
    public categoryInfo: CategoryInfo | null;

    public selectedAssignedExercise: ProgramAssignedExerciseInfo;
    public showStatusExerciseShowerModal: boolean | undefined = undefined;

    public get programId() {
        return this._activatedRoute.snapshot.params.id;
    }
    public get totalDuration(): number {
        return this.assignedExercises?.reduce((result, current) => result + (current.AutoSkipTime ?? 0), 0) ?? 0;
    }

    public get firstCompletedIndex(): number {
        return this.assignedExercises?.findIndex(i => i.IsCompleted) ?? -1;
    }
    public get isAllExerciseCompleted(): boolean {
        return this.assignedExercises?.every(i => i.IsCompleted) ?? false;
    }

    public get hasNextExerciseForShower(): boolean {
        let idx = this.assignedExercises.indexOf(this.selectedAssignedExercise);
        if (idx > -1) {
            return idx + 1 < this.assignedExercises.length;
        }
        return false;
    }
    public get hasPrevExerciseForShower(): boolean {
        let idx = this.assignedExercises.indexOf(this.selectedAssignedExercise);
        if (idx > -1) {
            return idx - 1 >= 0;
        }
        return false;
    }

    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _contentService: ContentService,
        private _statService: StatService,
        private _vimeoService: VimeoService,
        private _relationStatLogService: RelationStatLogService) { }

    ngAfterViewInit(): void {
        this.loadData();
    }

    public onTriggeredNext() {
        if (this.hasNextExerciseForShower) {
            this.selectedAssignedExercise = this.assignedExercises[this.assignedExercises.indexOf(this.selectedAssignedExercise) + 1];
        }
    }

    public onTriggeredPrev() {
        if (this.hasPrevExerciseForShower) {
            this.selectedAssignedExercise = this.assignedExercises[this.assignedExercises.indexOf(this.selectedAssignedExercise) - 1];
        }
    }

    public startExerciseShower(item?: ProgramAssignedExerciseInfo) {
        if (item) {
            this.selectedAssignedExercise = item;
            this.showStatusExerciseShowerModal = true;
            return;
        }

        if (this.assignedExercises?.length > 0) {
            let idx = 0;

            if (this.isAllExerciseCompleted) {
                idx = 0;
            }

            if (this.firstCompletedIndex > -1) {
                let firstShowIdx = this.assignedExercises.findIndex(i => !i.IsCompleted);
                if (firstShowIdx > -1) {
                    idx = firstShowIdx;
                }
            }
            this.selectedAssignedExercise = this.assignedExercises[idx];
            this.showStatusExerciseShowerModal = true;
            return;
        }
    }

    public formatSeconds(e: number) {
        return Helper.FormatSeconds(e);
    }

    public getContentTypeName(doc: DocumentModel): string {
        if (ConvertNumberToFileType(doc?.Type) == FileType.Image) {
            return "Resim";
        }
        if (ConvertNumberToFileType(doc?.Type) == FileType.Video) {
            return "Video";
        }
        return "Video";
    }

    private loadData() {
        this.cardLoaderDirective.start();
        // TODO Error page program is null
        forkJoin(
            {
                programInfo: this.loadProgramInfo(),
                exercises: this.loadExercises(),
                completedIds: this.loadCompletedExerciseIds(),
            })
            .pipe(finalize(() => this.cardLoaderDirective.stop()))
            .subscribe(
                (i) => {
                    if (i.programInfo) {
                        this.programInfo = i.programInfo;
                        this._relationStatLogService.insertRelationStatLog({
                            ActionKey: "PROGRAM_OPENED",
                            ProgramId: i.programInfo.Program.Id
                        }, LogLevel.Info);
                    }
                    if (i.exercises) {
                        this.assignedExercises = i.exercises;

                        this.assignedExercises.map(async j => {
                            if (j.ExerciseDocument) {
                                if (ConvertNumberToFileType(j.ExerciseDocument?.Type) == FileType.Image)
                                    j.ExerciseDocument.Thumbnail = `${j.ExerciseDocument.HostFullPath}?height = 300`;
                                if (ConvertNumberToFileType(j.ExerciseDocument?.Type) == FileType.Video)
                                    j.ExerciseDocument.Thumbnail = (await this._vimeoService.getVimeoVideoThumbnail(j?.ExerciseDocument?.Guid)).thumbnail_medium;
                            }
                            return j;
                        });
                    }
                    if (i.completedIds && this.assignedExercises) {
                        this.assignedExercises
                            .filter(j => i?.completedIds?.includes(j.RelationId))
                            .map(i => {
                                i.IsCompleted = true;
                                return i;
                            });
                    }
                });
    }

    private loadProgramInfo() {
        return this._contentService
            .programInfo(this.programId);
    }

    private loadExercises() {
        return this._contentService
            .assignedExercises(this.programId);
    }

    private loadCompletedExerciseIds() {
        return this._statService
            .completedExercisesOfProgram([this.programId]);
    }
}