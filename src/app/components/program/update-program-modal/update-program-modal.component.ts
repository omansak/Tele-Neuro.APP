import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import { empty, Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { VALIDATE_CHECKBOX_TRUE, VALIDATE_SELECT, VALIDATE_TEXT } from "src/app/consts/validate";
import { PageInfo } from "src/app/models/base-model";
import { CategoryInfo } from "src/app/models/category/category-info";
import { ProgramInfo } from "src/app/models/program/program-info";
import { ProgramModel } from "src/app/models/program/program-model";
import { CategoryService } from "src/app/services/category/category-service";
import { ONgCheckboxComponent } from "../../shared/o-ng-checkbox/o-ng-checkbox.component";
import { ONgSelectComponent } from "../../shared/o-ng-select/o-ng-select.component";
import { ONgTextareaComponent } from "../../shared/o-ng-textarea/o-ng-textarea.component";

@Component({
    selector: "o-update-program-modal",
    templateUrl: './update-program-modal.component.html',
    providers: [CategoryService],
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
    constructor(private _categoryService: CategoryService) { }

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
        this.editModel = Object.assign({}, this.programInfo)
    }

    ngAfterViewInit(): void {
        this.loadCategories();
        $(this.modal.nativeElement).on('hidden.bs.modal', () => {
            this.hideModal();
        })
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
            console.log(this.editModel);

        }
    }

    encodeURI(e: string) {
        return encodeURI(e);
    }

    private loadCategories() {
        setTimeout(() => { this.isLoadingCategories = true }, 16)
        this.categoriesObservable = this._categoryService
            .listCategories(new PageInfo(0, 0))
            .pipe(finalize(() => {
                setTimeout(() => { this.isLoadingCategories = false }, 16)
            }));
    }
}