import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import { concat, empty, Observable, of } from "rxjs";
import { finalize } from "rxjs/operators";
import { VALIDATE_CHECKBOX_TRUE, VALIDATE_SELECT, VALIDATE_TEXT } from "src/app/consts/validate";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { Helper } from "src/app/helpers/helper";
import { PageInfo } from "src/app/models/base-model";
import { CategoryInfo } from "src/app/models/category/category-info";
import { ProgramInfo } from "src/app/models/program/program-info";
import { ProgramModel } from "src/app/models/program/program-model";
import { CategoryService } from "src/app/services/category/category-service";
import { ToastService } from "src/app/services/common/toastr-service";
import { ProgramService } from "src/app/services/program/program-service";
import { ONgCheckboxComponent } from "../../shared/o-ng-checkbox/o-ng-checkbox.component";
import { ONgSelectComponent } from "../../shared/o-ng-select/o-ng-select.component";
import { ONgTextareaComponent } from "../../shared/o-ng-textarea/o-ng-textarea.component";

@Component({
    selector: "o-update-program-modal",
    templateUrl: './update-program-modal.component.html',
    providers: [CategoryService, ProgramService, ToastService],
    encapsulation: ViewEncapsulation.None
})
export class UpdateProgramModalComponent implements OnInit, AfterViewInit, OnChanges {
    // Inputs
    @Input()
    public programInfo?: ProgramInfo;
    @Input()
    public show: boolean = false;
    // Outputs
    @Output()
    public programInfoChange = new EventEmitter();
    @Output()
    public showChange = new EventEmitter();
    // Publics
    public editModel: ProgramInfo;
    public categoriesObservable: Observable<Array<CategoryInfo> | null>;
    public isLoadingCategories: boolean = false;
    public validate = {
        text: VALIDATE_TEXT,
        select: VALIDATE_SELECT,
        checkbox: VALIDATE_CHECKBOX_TRUE
    }
    // View children
    @ViewChild('modal', { static: true })
    public modal: ElementRef;
    @ViewChild('categorySelectElement', { static: true })
    public categorySelectElement: ONgSelectComponent;
    @ViewChild('descriptionElement', { static: true })
    public descriptionElement: ONgTextareaComponent;
    @ViewChild('nameElement', { static: true })
    public nameElement: ONgTextareaComponent;
    @ViewChild('checkboxElement', { static: true })
    public checkboxElement: ONgCheckboxComponent;
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;
    constructor(private _categoryService: CategoryService, private _programService: ProgramService, private _toastService: ToastService) { }

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
        if (!this.programInfo) {
            this.programInfo = new ProgramInfo();
            this.programInfo.Program = new ProgramModel();
            this.programInfo.Program.IsPublic = false;
        }
        this.editModel = Helper.Clone(this.programInfo);
        this.loadCategories();
    }

    ngAfterViewInit(): void {
        $(this.modal.nativeElement).on('hidden.bs.modal', () => {
            this.hideModal();
        });
    }

    emitChangeEvent() {
        this.programInfoChange.emit(this.programInfo);
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

    check() {
        return this.categorySelectElement.check() &&
            this.nameElement.check() &&
            this.descriptionElement.check();
    }

    save() {
        if (this.check()) {
            let toast = this._toastService.continuing("Program ekleniyor/güncelleniyor.", "Program ekleme/güncelleme tamamlandı.", "Program eklenemedi.");
            this.cardLoaderDirective.start();
            this._programService
                .updateProgram(this.editModel.Program)
                .pipe(finalize(() => {
                    this.cardLoaderDirective.stop();
                }))
                .subscribe(
                    (i) => {
                        if (i) {
                            this.editModel = i;
                            this.programInfo = this.editModel;
                            this.hideModal();
                            this.emitChangeEvent();
                            toast.success();
                        }
                    });
        }
    }

    encodeURI(e: string) {
        return encodeURI(e);
    }

    private loadCategories() {
        this.isLoadingCategories = true;
        this.categoriesObservable = concat(
            of([new CategoryInfo(this.editModel?.Category)]),
            this._categoryService
                .listAllActiveCategories()
                .pipe(finalize(() => {
                    this.isLoadingCategories = false;
                })));
    }
}