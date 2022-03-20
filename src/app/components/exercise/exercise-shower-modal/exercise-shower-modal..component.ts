import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import { ConvertNumberToFileType, FileType, LogLevel } from "src/app/consts/enums";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { Helper } from "src/app/helpers/helper";
import { ExerciseInfo } from "src/app/models/exercise/exercise-info";
import { ProgramAssignedExerciseInfo } from "src/app/models/program/program-assigned-exercise-info";
import { ToastService } from "src/app/services/common/toastr-service";
import { RelationStatLogService } from "src/app/services/utility/relation-stat-log-service";

@Component({
    selector: "o-exercise-shower-modal",
    templateUrl: './exercise-shower-modal.component.html',
    styleUrls: ['./exercise-shower-modal.component.scss'],
    providers: [RelationStatLogService],
    encapsulation: ViewEncapsulation.None
})
export class ExerciseShowerModalComponent implements OnChanges, OnInit, OnDestroy {
    // Input's
    @Input()
    public hasNext: boolean;
    @Input()
    public hasPrev: boolean;
    @Input()
    public assignedExercise: ProgramAssignedExerciseInfo;
    @Input()
    public show: boolean = false;
    // Output's
    @Output()
    public showChange = new EventEmitter();
    @Output()
    public triggeredNext = new EventEmitter();
    @Output()
    public triggeredPrev = new EventEmitter();
    // Public's
    public exerciseInfo: ExerciseInfo;
    public autoSkipStatus: boolean = true;
    public fileType = FileType;
    public isFullscreen: boolean = false;
    public autoSkipCounterInterval: any = null;
    public autoSkipCounterShow: boolean = false;
    public autoSkipTimerInterval: any = null;
    public autoSkipTimerTimeLimit: number;
    // View children
    @ViewChild('modal', { static: true })
    public modal: ElementRef;
    @ViewChild('videoContainer')
    public videoContainer: ElementRef;
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;

    // Private's
    private videoPlayer: any;
    constructor(private _relationStatLogService: RelationStatLogService, private _toastService: ToastService) { }

    ngOnDestroy(): void {
        this.cancelAutoSkipCounter();
        this.cancelAutoSkipTimer();
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
        if (changes.hasNext) {
            this.hasNext = changes.hasNext.currentValue as boolean;
        }
        if (changes.hasPrev) {
            this.hasPrev = changes.hasPrev.currentValue as boolean;
        }
        if (changes.assignedExercise) {
            this.assignedExercise = changes.assignedExercise.currentValue as ProgramAssignedExerciseInfo;
            if (this.assignedExercise) {
                setTimeout(() => {
                    this.initExercise();
                }, 64);
            }
        }
        else {
            console.error("assignedExercise is null");
            // TODO : Error Page assignedExercise is null
        }
    }

    ngOnInit(): void { }

    public completeProgram() {
        this._toastService.success("Tebrikler programı tamamladınız.");
        this._relationStatLogService.insertRelationStatLog({
            ActionKey: "PROGRAM_COMPLETE_BUTTON_CLICK",
            ProgramId: this.assignedExercise.ProgramId
        });
        this.hideModal();
    }

    public emitTriggeredNextEvent() {
        if (this.hasNext) {
            this.triggeredNext.emit(true);
            this._relationStatLogService.insertRelationStatLog({
                ActionKey: "EXERCISE_TRIGGERED_NEXT",
                ProgramId: this.assignedExercise.ProgramId,
                ExerciseProgramRelationId: this.assignedExercise.RelationId,
                ExerciseId: this.assignedExercise.Exercise?.Id
            });
        }
    }

    public emitTriggeredPrevEvent() {
        if (this.hasPrev) {
            this.triggeredPrev.emit(true);
            // Log
            this._relationStatLogService.insertRelationStatLog({
                ActionKey: "EXERCISE_TRIGGERED_PREV",
                ProgramId: this.assignedExercise.ProgramId,
                ExerciseProgramRelationId: this.assignedExercise.RelationId,
                ExerciseId: this.assignedExercise.Exercise?.Id
            });
        }
    }

    public toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        // Log
        this._relationStatLogService.insertRelationStatLog({
            ActionKey: "EXERCISE_TRIGGERED_FULLSCREEN",
            ProgramId: this.assignedExercise.ProgramId,
            ExerciseProgramRelationId: this.assignedExercise.RelationId,
            ExerciseId: this.assignedExercise.Exercise?.Id
        });
    }

    public hideModal() {
        $(this.modal.nativeElement)
            .modal('hide');
        this.show = false;
        this.emitShowEvent();
        // Log
        this._relationStatLogService.insertRelationStatLog({
            ActionKey: "EXERCISE_TRIGGERED_HIDE",
            ProgramId: this.assignedExercise.ProgramId,
            ExerciseProgramRelationId: this.assignedExercise.RelationId,
            ExerciseId: this.assignedExercise.Exercise?.Id
        });
    }

    public showModal() {
        $(this.modal.nativeElement)
            .appendTo("body")
            .modal('show');
        this.show = true;
        this.emitShowEvent();
    }

    public getDocumentType(value: number): FileType {
        return ConvertNumberToFileType(value);
    }

    public formatSeconds(e: number | null) {
        return Helper.FormatSeconds(e || 0);
    }

    public onAutoSkipTriggeredNext() {
        this.cancelAutoSkipCounter();
        this.cancelAutoSkipTimer();
        this.emitTriggeredNextEvent();
    }

    public cancelAutoSkipTimer() {
        clearInterval(this.autoSkipTimerInterval);
    }

    public cancelAutoSkipCounter() {
        this.autoSkipCounterShow = false;
        clearInterval(this.autoSkipCounterInterval);
    }

    private emitShowEvent() {
        this.showChange.emit(this.show);
    }

    private initAutoSkipTimerNonVideo() {
        if (this.hasNext && this.assignedExercise?.ExerciseDocument && this.getDocumentType(this.assignedExercise.ExerciseDocument.Type) != this.fileType.Video) {
            if (this.assignedExercise.AutoSkipTime != null && this.assignedExercise?.AutoSkipTime > 0) {
                let timeUpdateList: number[] = [];
                this.autoSkipTimerTimeLimit = this.assignedExercise.AutoSkipTime!;
                this.cancelAutoSkipTimer();
                this.autoSkipTimerInterval = setInterval(() => {
                    this.autoSkipTimerTimeLimit -= 1;
                    if (this.autoSkipTimerTimeLimit <= 0) {
                        if (this.autoSkipStatus) {
                            this.startAutoSkipCounter();
                        }
                        this.cancelAutoSkipTimer();
                        //Log
                        this._relationStatLogService.insertRelationStatLog({
                            ActionKey: "EXERCISE_ENDED",
                            ProgramId: this.assignedExercise.ProgramId,
                            ExerciseProgramRelationId: this.assignedExercise.RelationId,
                            ExerciseId: this.assignedExercise.Exercise?.Id
                        }, LogLevel.Important);

                        if (!this.hasNext) {
                            this._relationStatLogService.insertRelationStatLog({
                                ActionKey: "PROGRAM_COMPLETED",
                                ProgramId: this.assignedExercise.ProgramId
                            }, LogLevel.Important);
                        }
                    }
                    // Log
                    let timeAs5 = Math.round((this.assignedExercise.AutoSkipTime! - this.autoSkipTimerTimeLimit) / 5);
                    if (!timeUpdateList.includes(timeAs5)) {
                        timeUpdateList.push(timeAs5);
                        this._relationStatLogService.insertRelationStatLog({
                            ActionKey: "EXERCISE_NON_VIDEO_TIME_5",
                            ActionArgument: timeAs5.toString(),
                            ProgramId: this.assignedExercise.ProgramId,
                            ExerciseProgramRelationId: this.assignedExercise.RelationId,
                            ExerciseId: this.assignedExercise.Exercise?.Id
                        });
                    }
                }, 1000);
            }
        }
    }

    private initVideoPlayer() {
        let videoTimeUpdateList: number[] = [];
        let autoSkipTimerEnded = (e: any) => {
            if (this.assignedExercise.AutoSkip && this.autoSkipStatus) {
                this.startAutoSkipCounter();
            }
        }

        if (this.videoPlayer) {
            this.videoPlayer.destroy();
        }

        this.videoPlayer = new Vimeo.Player(this.videoContainer.nativeElement, {
            id: this.assignedExercise.ExerciseDocument.Guid,
            autoplay: true,
            transparent: false
        });

        this.videoPlayer.on('play', (e: any) => {
            // Log
            this._relationStatLogService.insertRelationStatLog({
                ActionKey: "EXERCISE_VIDEO_PLAYED",
                ActionArgument: Math.round(e.seconds).toString(),
                ProgramId: this.assignedExercise.ProgramId,
                ExerciseProgramRelationId: this.assignedExercise.RelationId,
                ExerciseId: this.assignedExercise.Exercise?.Id
            });
        });

        this.videoPlayer.on('pause', (e: any) => {
            // Log
            this._relationStatLogService.insertRelationStatLog({
                ActionKey: "EXERCISE_VIDEO_PAUSED",
                ActionArgument: Math.round(e.seconds).toString(),
                ProgramId: this.assignedExercise.ProgramId,
                ExerciseProgramRelationId: this.assignedExercise.RelationId,
                ExerciseId: this.assignedExercise.Exercise?.Id
            });
        });

        this.videoPlayer.on('ended', (e: any) => {
            autoSkipTimerEnded(e);
            // Log
            this._relationStatLogService.insertRelationStatLog({
                ActionKey: "EXERCISE_VIDEO_ENDED",
                ActionArgument: Math.round(e.seconds).toString(),
                ProgramId: this.assignedExercise.ProgramId,
                ExerciseProgramRelationId: this.assignedExercise.RelationId,
                ExerciseId: this.assignedExercise.Exercise?.Id
            });
            this._relationStatLogService.insertRelationStatLog({
                ActionKey: "EXERCISE_ENDED",
                ProgramId: this.assignedExercise.ProgramId,
                ExerciseProgramRelationId: this.assignedExercise.RelationId,
                ExerciseId: this.assignedExercise.Exercise?.Id
            }, LogLevel.Important);

            if (!this.hasNext) {
                this._relationStatLogService.insertRelationStatLog({
                    ActionKey: "PROGRAM_COMPLETED",
                    ProgramId: this.assignedExercise.ProgramId
                }, LogLevel.Important);
            }
        });

        this.videoPlayer.on('timeupdate', (e: any) => {
            let timeAs5 = Math.round(e.seconds / 5);
            if (!videoTimeUpdateList.includes(timeAs5)) {
                videoTimeUpdateList.push(timeAs5);
                // Log
                this._relationStatLogService.insertRelationStatLog({
                    ActionKey: "EXERCISE_VIDEO_TIME_5",
                    ActionArgument: timeAs5.toString(),
                    ProgramId: this.assignedExercise.ProgramId,
                    ExerciseProgramRelationId: this.assignedExercise.RelationId,
                    ExerciseId: this.assignedExercise.Exercise?.Id
                });
            }
        });
    }

    private initExercise() {
        this.cancelAutoSkipTimer();
        this.cancelAutoSkipCounter();

        if (this.assignedExercise.ExerciseDocument) {
            // Log
            this._relationStatLogService.insertRelationStatLog({
                ActionKey: "EXERCISE_OPENED",
                ProgramId: this.assignedExercise.ProgramId,
                ExerciseProgramRelationId: this.assignedExercise.RelationId,
                ExerciseId: this.assignedExercise.Exercise?.Id
            }, LogLevel.Important);

            if (this.getDocumentType(this.assignedExercise.ExerciseDocument.Type) == this.fileType.Video) {
                this.initVideoPlayer();
                return;
            }
            if (this.assignedExercise.AutoSkip) {
                this.initAutoSkipTimerNonVideo();
                return;
            }
        }
        // TODO : Error Page Document is null
    }

    private startAutoSkipCounter() {
        if (this.hasNext) {
            this.videoPlayer?.exitFullscreen();
            setTimeout(() => {
                this.autoSkipCounterShow = true;
                const COLOR_CODES = {
                    info: {
                        color: "green"
                    },
                    warning: {
                        color: "orange",
                        threshold: 5
                    },
                    alert: {
                        color: "red",
                        threshold: 3
                    }
                };
                let timePassed = 0;
                let TIME_LIMIT = 10;
                let timeLeft = TIME_LIMIT;
                setTimeout(() => {
                    document.getElementById("base-timer-label")!.innerHTML = "10";
                    let setCircleDasharray = () => {
                        const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
                        document.getElementById("base-timer-path-remaining")!.setAttribute("stroke-dasharray", circleDasharray);
                    }
                    let calculateTimeFraction = () => {
                        const rawTimeFraction = timeLeft / TIME_LIMIT;
                        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
                    }
                    let onTimesUp = () => {
                        this.emitTriggeredNextEvent();
                        this.cancelAutoSkipCounter();
                    }
                    let setRemainingPathColor = (timeLeft: any) => {
                        const { alert, warning, info } = COLOR_CODES;
                        if (timeLeft <= alert.threshold) {
                            document.getElementById("base-timer-path-remaining")!.classList.remove(warning.color);
                            document.getElementById("base-timer-path-remaining")!.classList.add(alert.color);
                        } else if (timeLeft <= warning.threshold) {
                            document.getElementById("base-timer-path-remaining")!.classList.remove(info.color);
                            document.getElementById("base-timer-path-remaining")!.classList.add(warning.color);
                        }
                    }
                    this.autoSkipCounterInterval = setInterval(() => {
                        timePassed = timePassed += 1;
                        timeLeft = TIME_LIMIT - timePassed;
                        document.getElementById("base-timer-label")!.innerHTML = timeLeft.toString();
                        setCircleDasharray();
                        setRemainingPathColor(timeLeft);
                        if (timeLeft <= 0) onTimesUp();
                    }, 1000);
                }, 128);
            }, 500);
        }
    }
}