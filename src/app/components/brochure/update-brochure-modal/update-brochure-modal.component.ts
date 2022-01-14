import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { VALIDATE_FILE, VALIDATE_TEXT } from 'src/app/consts/validate';
import { CardLoaderDirective } from 'src/app/directives/card-loader.directive';
import { Helper } from 'src/app/helpers/helper';
import { BrochureInfo } from 'src/app/models/brochure/brochure-info';
import { BrochureModel } from 'src/app/models/brochure/brochure-model';
import { BrochureService } from 'src/app/services/brochure/brochure-service';
import { ToastService } from 'src/app/services/common/toastr-service';
import { ONgFileInputComponent } from '../../shared/o-ng-file-input/o-ng-file-input.component';
import { ONgTextareaComponent } from '../../shared/o-ng-textarea/o-ng-textarea.component';

@Component({
  selector: "o-update-brochure-modal",
  templateUrl: './update-brochure-modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UpdateBrochureModalComponent implements OnChanges, OnInit, AfterViewInit {
  // Inputs
  @Input()
  public brochureInfo?: BrochureInfo;
  @Input()
  public show: boolean = false;
  // Outputs
  @Output()
  public brochureInfoChange = new EventEmitter();
  @Output()
  public showChange = new EventEmitter();
  // Public's
  public editModel: BrochureInfo;
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
  @ViewChild('nameElement', { static: true })
  public nameElement: ONgTextareaComponent;
  @ViewChild('fileElement', { static: true })
  public fileElement: ONgFileInputComponent;
  @ViewChild('modal', { static: true })
  public modal: ElementRef;
  @ViewChild(CardLoaderDirective)
  public cardLoaderDirective: CardLoaderDirective;
  // Privates

  constructor(private _brochureService: BrochureService, private _toastService: ToastService) { }
  ngOnInit(): void {
    if (!this.brochureInfo) {
      this.brochureInfo = new BrochureInfo();
      this.brochureInfo.Brochure = new BrochureModel();
    }
    this.editModel = Helper.Clone(this.brochureInfo);
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
    this.brochureInfoChange.emit(this.brochureInfo);
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
    return this.fileElement.check() && this.nameElement.check();
  }

  save() {
    if (this.check()) {
      let toast = this._toastService.continuing("Broşür ekleniyor/güncelleniyor.", "Broşür ekleme/güncelleme tamamlandı.", "Broşür eklenemedi.");
      this.progressOption.start();
      this.cardLoaderDirective.start();
      this._brochureService
        .updateBrochureProgressive(this.editModel.Brochure)
        .pipe(finalize(() => {
          this.progressOption.stop();
          this.cardLoaderDirective.stop();
        }))
        .subscribe(
          (i) => {
            if (i.IsDone) {
              this.editModel = <BrochureInfo>i.Result;
              this.brochureInfo = this.editModel;
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
