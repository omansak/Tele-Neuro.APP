import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CDN_CSS_FILE_INPUT, CDN_JS_FILE_INPUT, CDN_JS_FILE_INPUT_LOCALE } from 'src/app/consts/cdns';
import { Helper } from 'src/app/helpers/helper';
import { LazyLoaderService } from 'src/app/services/common/lazy-script-loader.service';

// TODO Multiple Cropper
@Component({
  selector: 'o-ng-file-input',
  templateUrl: './o-ng-file-input.component.html',
  styleUrls: ['./o-ng-file-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ONgFileInputComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class ONgFileInputComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  //Inputs
  @Input()
  public header: string;
  @Input()
  public description: string;
  @Input()
  public placeholder: string;
  @Input()
  public containerClass: string;
  @Input()
  public inputClass: string;
  @Input()
  public maxFileSize: number = 10 * 1024;
  @Input()
  public disabled: boolean = false;
  @Input()
  public showPreview: boolean = true;
  @Input()
  public multiple: boolean = false;
  @Input()
  public cropperActive: boolean = false;
  @Input()
  public allowedFileTypes: string[] | null = null;//['image', 'html', 'text', 'video', 'audio', 'flash', 'object'];
  @Input()
  public allowedFileExtensions: string[] | null = null; // ['jpg', 'gif', 'png', 'txt']
  @Input()
  public cropperWidth: number = 0;
  @Input()
  public cropperHeight: number = 0;
  // Outputs
  @Output('change')
  public changeEvent = new EventEmitter();
  // Publics
  public value: File | File[];
  public errorContainerId = Helper.RandomString();
  public fileInputId = Helper.RandomString();
  public showCropper: boolean = false;
  // Privates
  private fileInput: any;
  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor(private _lazyLoaderService: LazyLoaderService) { }
  ngAfterViewInit(): void {
    forkJoin([
      this._lazyLoaderService.loadStyle(CDN_CSS_FILE_INPUT),
      this._lazyLoaderService.loadScript(CDN_JS_FILE_INPUT),
      this._lazyLoaderService.loadScript(CDN_JS_FILE_INPUT_LOCALE)
    ])
      .subscribe(() => {
        this.initFileInput();
      });
  }

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  emitChangeEvent(e: File) {
    this._onChange(this.value)
    this.changeEvent.emit(e);
  }

  changeValue(e: File[]) {
    if (this.multiple)
      this.value = e;
    else
      this.value = e[0];
  }

  changeValueFromEvent(e: any) {
    if (e?.target?.files) {
      this.changeValue(e?.target?.files)
    }
  }

  initCropper() {
    this.showCropper = true;
  }

  initFileInput(initialPreview: any = null) {
    $(`#${this.fileInputId}`).val("");
    this.fileInput = $(`#${this.fileInputId}`)
      .fileinput({
        overwriteInitial: true,
        maxFileSize: this.maxFileSize,
        showUpload: false,
        elErrorContainer: $(`#${this.errorContainerId}`),
        showZoom: false,
        language: 'tr',
        allowedFileTypes: this.allowedFileTypes,
        allowedFileExtensions: this.allowedFileExtensions,
        maxFileCount: this.multiple ? null : 0,
        initialPreviewAsData: true,
        initialPreview: [initialPreview],
        initialPreviewShowDelete: false,
        fileActionSettings: {
          showDrag: false
        },
        previewZoomButtonClasses: {
          close: 'd-none'
        }
      })
      .on('change', (e: any) => {
        if (!this.cropperActive) {
          this.changeValueFromEvent(e);
          this.emitChangeEvent(e);
        }
      })
      .on('filecleared', (e: any) => {
        this.changeValueFromEvent(e);
        this.emitChangeEvent(e);
      })
      .on('fileimageloaded', (e: any) => {
        if (this.cropperActive) {
          if (!this.multiple) {
            this.changeValueFromEvent(e);
            this.initCropper();
          }
          else {
            console.error("Cropper does not active if multiple is true and allowedFileTypes is not image ");
          }
        }
      })
      .on('fileerror', (event: any, data: any, msg: string) => {
        console.error(msg);
      });
  }

  destroyFileInput() {
    this.fileInput.fileinput('destroy');
  }

  onImageCropped(e: File) {
    this.value = e;
    this.showCropper = false;
    const reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onload = () => {
      this.destroyFileInput();
      this.initFileInput(reader.result);
      this.emitChangeEvent(e);
    };
  }
}
