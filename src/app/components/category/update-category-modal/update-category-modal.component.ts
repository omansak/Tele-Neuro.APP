import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { VALIDATE_FILE, VALIDATE_TEXT } from 'src/app/consts/validate';
import { CardLoaderDirective } from 'src/app/directives/card-loader.directive';
import { Helper } from 'src/app/helpers/helper';
import { CategoryInfo } from 'src/app/models/category/category-info';
import { CategoryModel } from 'src/app/models/category/category-model';
import { CategoryService } from 'src/app/services/category/category-service';
import { ToastService } from 'src/app/services/common/toastr-service';
import { ONgFileInputComponent } from '../../shared/o-ng-file-input/o-ng-file-input.component';
import { ONgTextareaComponent } from '../../shared/o-ng-textarea/o-ng-textarea.component';

@Component({
  selector: "o-update-category-modal",
  templateUrl: './update-category-modal.component.html',
  providers: [CategoryService],
  encapsulation: ViewEncapsulation.None
})
export class UpdateCategoryModalComponent implements OnChanges, OnInit, AfterViewInit {
  // Inputs
  @Input()
  public categoryInfo?: CategoryInfo;
  @Input()
  public show: boolean = false;
  // Outputs
  @Output()
  public categoryInfoChange = new EventEmitter();
  @Output()
  public showChange = new EventEmitter();
  // Public's
  public editModel: CategoryInfo;
  public validate = {
    text: VALIDATE_TEXT,
    file: VALIDATE_FILE
  }
  public progressOption = {
    max: 100,
    value: 0,
    animate: true,
    show: false,
    start() {
      this.show = true;
      this.animate = true;
    },
    stop() {
      this.animate = false;
    }
  }
  // View children
  @ViewChild('descriptionElement', { static: true })
  public descriptionElement: ONgTextareaComponent;
  @ViewChild('nameElement', { static: true })
  public nameElement: ONgTextareaComponent;
  @ViewChild('fileElement', { static: true })
  public fileElement: ONgFileInputComponent;
  @ViewChild('modal', { static: true })
  public modal: ElementRef;
  @ViewChild(CardLoaderDirective)
  public cardLoaderDirective: CardLoaderDirective;
  // Privates

  constructor(private _categoryService: CategoryService, private _toastService: ToastService) { }
  ngOnInit(): void {
    if (!this.categoryInfo) {
      this.categoryInfo = new CategoryInfo();
      this.categoryInfo.Category = new CategoryModel();
    }
    this.editModel = Object.assign({}, this.categoryInfo)
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

  ngAfterViewInit(): void {
    $(this.modal.nativeElement).on('hidden.bs.modal', () => {
      this.hideModal();
    })
  }

  emitChangeEvent() {
    this.categoryInfoChange.emit(this.categoryInfo);
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
    return this.fileElement.check() && this.nameElement.check() && this.descriptionElement.check();
  }

  save() {
    if (this.check()) {
      let toast = this._toastService.continuing("Kategori ekleniyor/güncelleniyor.", "Kategori ekleme/güncelleme tamamlandı.", "Kategori eklenemedi.");
      this.progressOption.start();
      this.cardLoaderDirective.start();
      this._categoryService
        .updateCategoryProgressive(this.editModel.Category)
        .pipe(finalize(() => {
          this.progressOption.stop();
          this.cardLoaderDirective.stop();
        }))
        .subscribe(
          (i) => {
            if (i.IsDone) {
              this.editModel = <CategoryInfo>i.Result;
              this.categoryInfo = this.editModel;
              this.hideModal();
              this.emitChangeEvent();
              toast.success();
            }
            if (i.UploadProgress) {
              this.progressOption.value = Helper.Round(i.percentage(i.UploadProgress), 2);
            }
          });
    }
  }
}
