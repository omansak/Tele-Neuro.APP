import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CDN_CSS_FILE_INPUT, CDN_JS_FILE_INPUT, CDN_JS_FILE_INPUT_LOCALE } from 'src/app/consts/cdns';
import { FileType, StatusType } from 'src/app/consts/enums';
import { Helper } from 'src/app/helpers/helper';
import { LazyLoaderService } from 'src/app/services/common/lazy-script-loader.service';

export class ONgFileInput {
  File?: File;
  Url?: string;
  Type: FileType;
  IsChanged: boolean;
}
// TODO Block Trigger Multi init
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
export class ONgFileInputComponent implements ControlValueAccessor, AfterViewInit {
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
  public maxFileSize: number = 1024;
  @Input()
  public disabled: boolean = false;
  @Input()
  public showPreview: boolean = true;
  @Input()
  public allowedFileTypes: string[] | null = null;//['image', 'html', 'text', 'video', 'audio', 'flash', 'object'];
  @Input()
  public allowedFileExtensions: string[] | null = null; // ['jpg', 'gif', 'png', 'txt']
  @Input()
  public validate: (value: any) => { status: StatusType | undefined | null, message?: string | undefined | null };
  @Input()
  public isLoading: boolean = false;
  @Input()
  public cropperActive: boolean = false;
  @Input()
  public cropperFormat: 'png' | 'jpeg' | 'webp' | 'bmp' | 'ico' = 'png';
  @Input()
  public cropperWidth: number = 0;
  @Input()
  public cropperHeight: number = 0;
  @Input()
  public cropperMaintainAspectRatio: boolean = true;
  @Input()
  public cropperAspectRatio = 1 / 1;
  // Outputs
  @Output('change')
  public changeEvent = new EventEmitter();
  // Publics
  public value: ONgFileInput | null;
  public showCropper: boolean = false;
  public isValid: StatusType | undefined | null = undefined;
  public validateMessage: string | undefined | null = undefined;
  // Privates
  private bootstrapFileInput: any;
  private _onChange = (_: any) => { };
  private _onTouched = () => { };
  private lazyLoaderObservable = forkJoin([
    this._lazyLoaderService.loadStyle(CDN_CSS_FILE_INPUT),
    this._lazyLoaderService.loadScript(CDN_JS_FILE_INPUT),
    this._lazyLoaderService.loadScript(CDN_JS_FILE_INPUT_LOCALE)
  ]);
  @ViewChild('fileInput', { static: true })
  private fileInput: ElementRef;
  @ViewChild('errorContainer', { static: true })
  private errorContainer: ElementRef;
  constructor(private _lazyLoaderService: LazyLoaderService) { }

  ngAfterViewInit(): void {
    if (this.cropperActive && !Helper.ObjectsEqual(this.allowedFileTypes, ['image'])) {
      console.error("cropperActive just active when allowedFileTypes is image")
      return;
    }
    this.lazyLoaderObservable.subscribe(() => {
      this.initFileInput(this.value);
    });
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (this.value) {
      this.lazyLoaderObservable.subscribe(() => {
        this.initFileInput(this.value);
      });
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  emitChangeEvent(e: File) {
    this.check();
    this._onChange(this.value)
    this.changeEvent.emit(e);
  }

  emitFocusEvent() {
    this._onTouched();
  }

  changeValueFromFile(file: File | null, fileType?: FileType) {
    if (file) {
      let type: FileType = fileType || FileType.Unknown;
      let input: ONgFileInput = { File: file, Type: type, IsChanged: true }
      this.value = input;
    }
    else {
      this.value = null;
    }
  }

  initONgFileInput(file?: File, url?: string): ONgFileInput {
    let fileINput = new ONgFileInput();
    fileINput.File = file;
    fileINput.Url = url;
    fileINput.IsChanged = true;
    return fileINput;
  }

  onImageCropped(e: File) {
    let input = this.initONgFileInput(e);
    input.Type = FileType.Image
    this.value = input;
    this.showCropper = false;

    this.initFileInput(this.value);
    this.emitChangeEvent(e);
  }

  check() {
    if (this.validate) {
      let val = this.validate(this.value);
      this.isValid = val.status;
      this.validateMessage = val.message;
      if (val.status == StatusType.Error) {
        this.fileInput.nativeElement.focus();
      }
      return val.status == StatusType.Success;
    }
    return undefined;
  }

  private initCropper() {
    this.showCropper = true;
  }

  private initFileInput(initialInput: ONgFileInput | null = null) {
    let config: any = {
      overwriteInitial: true,
      maxFileSize: this.maxFileSize,
      showUpload: false,
      elErrorContainer: this.errorContainer.nativeElement,
      showZoom: false,
      language: 'tr',
      allowedFileTypes: this.allowedFileTypes,
      allowedFileExtensions: this.allowedFileExtensions,
      maxFileCount: 1,
      fileActionSettings: {
        showDrag: false,
        zoomIcon: '<i class="icofont-ui-zoom-in"></i>',
      },
      previewZoomButtonIcons: {
        prev: '<i class="icofont-caret-left"></i>',
        next: '<i class="icofont-caret-right"></i>',
        toggleheader: '<i class="icofont-circled-up"></i>',
        fullscreen: '<i class="icofont-expand"></i>',
        borderless: '<i class="icofont-rounded-expand"></i>',
        close: '<i class="icofont-close-circled"></i>'
      },
      initialPreviewShowDelete: false
    }

    if (initialInput && initialInput.File) {
      const reader = new FileReader();
      reader.readAsDataURL(initialInput.File);
      reader.onload = () => {
        if (initialInput.Type == FileType.Image) {
          config.initialPreview = [`<img src="${reader.result}" class="kv-preview-data file-preview-image">`];
          config.initialPreviewConfig = [
            { previewAsData: false, size: initialInput.File!.size, caption: initialInput.File!.name, filetype: initialInput.File!.type },
          ];
        }
        this.initBootstrapFileInput(config);
      }
    }
    else if (initialInput && initialInput.Url) {
      if (initialInput.Type == FileType.Image) {
        config.initialPreview = [`<img src="${initialInput.Url}" class="kv-preview-data file-preview-image">`];
        config.initialPreviewConfig = [
          { previewAsData: false },
        ];
      }
      this.initBootstrapFileInput(config);
    }
    else {
      this.initBootstrapFileInput(config);
    }
  }

  private destroyFileInput() {
    this.bootstrapFileInput.fileinput('destroy');
  }

  private initBootstrapFileInput(config: any) {
    if (this.bootstrapFileInput) {
      this.destroyFileInput();
    }
    this.fileInput.nativeElement.value = null;
    this.bootstrapFileInput = $(this.fileInput.nativeElement)
      .fileinput(config)
      .on('change', (e: any) => {
        if (!this.cropperActive) {
          this.changeValueFromFile(e?.target?.files[0]);
          this.emitChangeEvent(e);
        }
      })
      .on('filecleared', (e: any) => {
        this.changeValueFromFile(null);
        this.emitChangeEvent(e);
      })
      .on('fileimageloaded', (e: any) => {
        if (this.cropperActive) {
          this.changeValueFromFile(e?.target?.files[0], FileType.Image);
          this.initCropper();
        }
      })
      .on('fileerror', (event: any, data: any, msg: string) => {
        console.error(msg);
      });
  }
}
