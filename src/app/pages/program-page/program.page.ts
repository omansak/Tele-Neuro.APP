import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin } from "rxjs";
import { finalize } from "rxjs/operators";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { Helper } from "src/app/helpers/helper";
import { CategoryInfo } from "src/app/models/category/category-info";
import { AssignedExerciseModel } from "src/app/models/program/assigned-exercise-model";
import { ProgramInfo } from "src/app/models/program/program-info";
import { CategoryService } from "src/app/services/category/category-service";
import { ContentService } from "src/app/services/content/content-service";


@Component({
    templateUrl: './program.page.html',
    styleUrls: ['./program.page.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ContentService, CategoryService]
})
export class ProgramPage implements AfterViewInit {

    //Publics
    public programInfo: ProgramInfo | null;
    public assignedExercises: Array<AssignedExerciseModel>;
    public categoryInfo: CategoryInfo | null;

    public selectedAssignedExercise: AssignedExerciseModel;
    public showStatusExerciseShowerModal: boolean | undefined = undefined;

    public get programId() {
        return this._activatedRoute.snapshot.params.id;
    }
    public get totalDuration(): number {
        return this.assignedExercises?.reduce((result, current) => result + (current.AutoSkipTime ?? 0), 0) ?? 0;
    };
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;
    constructor(private _activatedRoute: ActivatedRoute, private _contentService: ContentService, private _categoryService: CategoryService) { }

    ngAfterViewInit(): void {
        this.loadData();
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

    public startExerciseShower() {
        if (this.assignedExercises?.length > 0) {
            this.selectedAssignedExercise = this.assignedExercises[0];
            this.showStatusExerciseShowerModal = true;
        }
    }

    public formatSeconds(e: number) {
        return Helper.FormatSeconds(e);
    }

    private loadData() {
        this.cardLoaderDirective.start();
        forkJoin(
            {
                programInfo: this.loadProgramInfo(),
                exercises: this.loadExercises()
            })
            .pipe(finalize(() => this.cardLoaderDirective.stop()))
            .subscribe(
                (i) => {
                    if (i.programInfo) {
                        this.programInfo = i.programInfo;
                    }
                    if (i.exercises) {
                        this.assignedExercises = i.exercises;
                    }
                });
    }

    private loadProgramInfo() {
        return this._contentService
            .searchExercises(this.programId);
    }

    private loadExercises() {
        return this._contentService
            .assignedExercises(this.programId);
    }
}