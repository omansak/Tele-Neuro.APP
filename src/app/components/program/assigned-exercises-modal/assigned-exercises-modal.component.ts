import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import { finalize } from "rxjs/operators";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { ProgramAssignedExerciseInfo } from "src/app/models/program/program-assigned-exercise-info";
import { ToastService } from "src/app/services/common/toastr-service";
import { ProgramService } from "src/app/services/program/program-service";

@Component({
    selector: "o-assigned-exercises-modal",
    templateUrl: './assigned-exercises-modal.component.html',
    providers: [ProgramService, ToastService],
    encapsulation: ViewEncapsulation.None
})
export class AssignedExercisesModal implements OnInit, OnChanges, AfterViewInit {
    // Inputs
    @Input()
    public programId: number
    @Input()
    public show: boolean = false;
    //Outputs
    @Output()
    public showChange = new EventEmitter();
    // Publics
    public assignedExercises: Array<ProgramAssignedExerciseInfo>;
    // View children
    @ViewChild('modal', { static: true })
    public modal: ElementRef;
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;
    constructor(private _programService: ProgramService, private _toastService: ToastService) { }

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
        if (this.programId <= 0)
            throw new Error("Program Id invalid.")
    }

    ngAfterViewInit(): void {
        this.loadExercises();
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

    changeDirection(id: number, direction: number) {
        let toast = this._toastService.continuing("Egzersiz yeniden konumlandırılıyor", "Egzersiz yeniden konumlandı", "Egzersiz yeniden konumlanamadı");
        this.cardLoaderDirective.start();
        this._programService
            .changeSequenceAssignedExercise(id, direction)
            .pipe(finalize(() => {
                this.cardLoaderDirective.stop();
            }))
            .subscribe(
                (i) => {
                    if (i) {
                        let current = this.assignedExercises.find(i => i.RelationId == id);
                        let swap = this.assignedExercises.find(i => i.Sequence == current!.Sequence + direction);
                        current!.Sequence += direction;
                        swap!.Sequence -= direction;
                        toast.success();
                        this.orderExercises();
                    }
                    else {
                        toast.error();
                    }
                }
            );
    }

    deleteExercise(relationId: number) {
        let toast = this._toastService.continuing("Egzersiz siliniyor", "Egzersiz silindi", "Egzersiz silinemedi");
        this.cardLoaderDirective.start();
        this._programService
            .deleteAssignedExercise(relationId)
            .pipe(finalize(() => {
                this.cardLoaderDirective.stop();
            }))
            .subscribe(
                (i) => {
                    if (i) {
                        let idx = this.assignedExercises?.findIndex(i => i.RelationId == relationId);
                        if (idx > -1) {
                            this.assignedExercises.splice(idx, 1);
                            let index = 1;
                            this.assignedExercises.forEach(j => {
                                j.Sequence = index++;
                            });
                            toast.success();
                        }
                        else {
                            toast.error();
                        }
                    }
                    else {
                        toast.error();
                    }
                }
            );
    }

    private loadExercises() {
        this.cardLoaderDirective.start();
        this._programService
            .assignedExercises(this.programId)
            .pipe(finalize(() => {
                this.cardLoaderDirective.stop();
            }))
            .subscribe(
                (i) => {
                    if (i && i.length > 0) {
                        this.assignedExercises = i;
                        this.orderExercises();
                    }
                }
            );
    }

    private orderExercises() {
        this.assignedExercises = this.assignedExercises?.sort((i, j) => i.Sequence > j.Sequence ? 1 : -1);
    }
}