import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren, ViewEncapsulation } from "@angular/core";
import { concat, Observable, of, Subject } from "rxjs";
import { distinctUntilChanged, finalize, switchMap, tap } from "rxjs/operators";
import { ConvertNumberToFileType, FileType } from "src/app/consts/enums";
import { VALIDATE_TEXT, VALIDATE_SELECT, VALIDATE_CHECKBOX_TRUE, VALIDATE_NUMBER } from "src/app/consts/validate";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { DocumentModel } from "src/app/models/document/document-model";
import { ExerciseInfo } from "src/app/models/exercise/exercise-info";
import { AssignExerciseModel } from "src/app/models/program/assign-exercise-model";
import { ExercisePropertyDefinition } from "src/app/models/utility/exercise-property-definition";
import { SearchTermModel } from "src/app/models/utility/search-term-model";
import { ToastService } from "src/app/services/common/toastr-service";
import { ExerciseService } from "src/app/services/exercise/exercise-service";
import { ProgramService } from "src/app/services/program/program-service";
import { UtilityService } from "src/app/services/utility/utility-service";
import { ONgCheckboxComponent } from "../../shared/o-ng-checkbox/o-ng-checkbox.component";
import { ONgInputComponent } from "../../shared/o-ng-input/o-ng-input.component";
import { ONgSelectComponent } from "../../shared/o-ng-select/o-ng-select.component";

@Component({
    selector: "o-update-exercise-of-program-modal",
    templateUrl: './update-exercise-of-program-modal.component.html',
    providers: [UtilityService, ExerciseService, ProgramService],
    encapsulation: ViewEncapsulation.None
})
export class UpdateExerciseOfProgramModalComponent implements OnInit, AfterViewInit, OnChanges {
    public model: AssignExerciseModel;
    // Inputs
    @Input()
    public programId: number;
    @Input()
    public show: boolean = false;
    //Outputs
    @Output()
    public showChange = new EventEmitter();
    // Publics
    public exercisesInfoSearchLoading = false;
    public exercisesInfoObservable: Observable<Array<ExerciseInfo> | never[] | null>;
    public exerciseSearchTermSubject = new Subject<string>();
    public exercisePropertyDefinitions: Array<ExercisePropertyDefinition> | null;
    public isLoadingExercisePropertyDefinitions: boolean = false;
    public isLoadingAutoSkipTime: boolean = false;
    public isDisabledAutoSkipTime: boolean = false;

    public validate = {
        text: VALIDATE_TEXT,
        number: VALIDATE_NUMBER,
        select: VALIDATE_SELECT,
        checkbox: VALIDATE_CHECKBOX_TRUE,
    }
    // View children
    @ViewChild('modal', { static: true })
    public modal: ElementRef;
    @ViewChildren('exercisePropertyElement')
    public exercisePropertyElements: QueryList<ONgSelectComponent>;
    @ViewChildren('exercisePropertyValueElement')
    public exercisePropertyValueElements: QueryList<ONgInputComponent>;
    @ViewChild('exerciseElement', { static: true })
    public exerciseElement: ONgSelectComponent;
    @ViewChild('autoSkipCheckboxElement', { static: true })
    public autoSkipCheckboxElement: ONgCheckboxComponent;
    @ViewChild('autoSkipTimeElement')
    public autoSkipTimeElement: ONgInputComponent;
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;

    constructor(
        private _utilityService: UtilityService,
        private _toastService: ToastService,
        private _exerciseService: ExerciseService,
        private _programService: ProgramService) { }

    ngAfterViewInit(): void { }

    ngOnInit(): void {
        if (this.programId <= 0)
            throw new Error("Program Id invalid.")
        this.model = new AssignExerciseModel();
        this.model.AutoSkip = true;
        this.model.ProgramId = this.programId;
        this.model.Properties = [];
        this.loadExercisePropertyDefinitions();
        this.loadExercisesInfoObservable();
    }

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

    public hideModal() {
        $(this.modal.nativeElement)
            .modal('hide');
        this.show = false;
        this.emitShowEvent();
    }

    public showModal() {
        $(this.modal.nativeElement)
            .modal('show');
        this.show = true;
        this.emitShowEvent();
    }

    public check() {
        return this.exerciseElement.check()
            && this.exercisePropertyElements?.reduce((result, current) => result && current.check() == true, true)
            && this.exercisePropertyValueElements?.reduce((result, current) => result && current.check() == true, true)
            && (this.model.AutoSkip ? this.autoSkipTimeElement.check() : true);
    }

    public save() {
        if (this.check()) {
            let toast = this._toastService.continuing("Egzersiz atanıyor", "Egzersiz atama tamamlandı", "Atama yapılamadı.");
            this.cardLoaderDirective.start();
            this._programService
                .assignExercise(this.model)
                .pipe(finalize(() => {
                    this.cardLoaderDirective.stop();
                }))
                .subscribe(
                    (i) => {
                        if (i > 0) {
                            this.model.Id = i;
                            this.hideModal();
                            toast.success();
                        }
                    });
        }
    }

    public addProperty() {
        this.model.Properties.push({ Id: this.exercisePropertyDefinitions![0].Id, Value: undefined });
    }

    public removeProperty(e: { Id: number, Value: any }) {
        const index = this.model.Properties.indexOf(e);
        if (index > -1) {
            this.model.Properties.splice(index, 1);
        }
    }

    public getExerciseProperty(id: number) {
        return this.exercisePropertyDefinitions?.find(i => i.Id == id);
    }

    public async setDefaultDuration(e?: DocumentModel) {
        let duration: number = 25;
        this.isLoadingAutoSkipTime = true;
        if (e) {
            if (ConvertNumberToFileType(e?.Type) == FileType.Video) {
                this.isDisabledAutoSkipTime = true;
                // TODO move to VimeoService
                let iframe =
                    $('<iframe>', {
                        id: 'vimeoDurationIFrame',
                        class: 'd-none',
                        src: `https://player.vimeo.com/video/${e.Guid}`
                    })
                        .appendTo('body');
                let player = new Vimeo.Player(iframe);
                await player
                    .ready()
                    .then(async () => {
                        await player
                            .getDuration()
                            .then((i: any) => duration = i);
                    });
                $(iframe).remove();
            }
            else {
                this.isDisabledAutoSkipTime = false;
            }
        }

        this.model.AutoSkipTime = duration;
        this.isLoadingAutoSkipTime = false;
    }

    private emitShowEvent() {
        this.showChange.emit(this.show);
    }

    private loadExercisesInfoObservable() {
        this.exercisesInfoObservable = concat(
            of([]),
            this.exerciseSearchTermSubject.pipe(
                distinctUntilChanged(),
                tap(() => this.exercisesInfoSearchLoading = true),
                switchMap(i => {
                    if (i) {
                        return this._exerciseService.searchExercises(new SearchTermModel(i))
                            .pipe(
                                finalize(() => this.exercisesInfoSearchLoading = false)
                            );
                    }
                    return of([])
                        .pipe(finalize(() => this.exercisesInfoSearchLoading = false));
                })
            )
        )
    }

    private loadExercisePropertyDefinitions() {
        this.isLoadingExercisePropertyDefinitions = true;
        this._utilityService
            .listExercisePropertyDefinitions()
            .pipe(finalize(() => this.isLoadingExercisePropertyDefinitions = false))
            .subscribe(
                (i) => {
                    if (i && i?.length > 0) {
                        this.exercisePropertyDefinitions = i;
                    }
                }
            );
    }
}