import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { StatusType } from 'src/app/consts/enums';
import { LCL_SEARCH_TERM_PLACEHOLDER, LCL_SELECT_LOADING, LCL_SELECT_NOT_FOUND, LCL_SELECT_PLACEHOLDER } from 'src/app/consts/locales';

/*
  Templates
  ng-label-tmp --> #labelTemplate
  ng-option-tmp --> #optionTemplate
*/
@Component({
  selector: 'o-ng-select',
  templateUrl: './o-ng-select.component.html',
  styleUrls: ['./o-ng-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ONgSelectComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class ONgSelectComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {
  // Inputs
  @Input()
  public bindLabel: string = "text";
  @Input()
  public bindValue: string = "value";
  @Input()
  public editableSearchTerm: false;
  @Input()
  public searchable: boolean = true;
  @Input()
  public clearable: boolean = true;
  @Input()
  public searchLoading: boolean = false;
  @Input()
  public multiple = false;
  @Input()
  public typeahead: Subject<string>;
  @Input()
  public trackByFn = null;
  @Input()
  public closeOnSelect: boolean = true;
  @Input()
  public hideSelected: boolean = false;
  @Input()
  public minTermLength: number = 2;
  @Input()
  public typeToSearchText: string = LCL_SEARCH_TERM_PLACEHOLDER;
  @Input()
  public header: string;
  @Input()
  public tooltip: string;
  @Input()
  public inputClass: string;
  @Input()
  public description: string;
  @Input()
  public disabled: boolean;
  @Input()
  public isLoading: boolean;
  @Input()
  public validate: (value: any) => { status: StatusType | undefined | null, message?: string | undefined | null };
  @Input()
  public get items() { return this._items };
  public set items(value: any[] | null) {
    if (value === null) {
      value = [];
    }
    this._items = value;
  };
  // Outputs
  @Output('change')
  public changeEvent = new EventEmitter();
  // Publics
  public value: any;
  public isValid: StatusType | undefined | null = undefined;
  public validateMessage: string | undefined | null = undefined;
  // Privates
  private _items: Array<any>;
  private _onChange = (_: any) => { };
  private _onTouched = () => { };
  @ViewChild("tooltipElement")
  public tooltipElement: ElementRef;
  @ContentChild("optionTemplate", { read: TemplateRef })
  public optionTemplate: TemplateRef<any>;
  @ContentChild("labelTemplate", { read: TemplateRef })
  public labelTemplate: TemplateRef<any>;
  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = LCL_SELECT_NOT_FOUND;
    this.config.loadingText = LCL_SELECT_LOADING;
    this.config.placeholder = LCL_SELECT_PLACEHOLDER;
    this.config.bindValue = 'value';
    this.config.bindLabel = 'text';
    //this.config.appendTo = 'body';
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tooltip && !changes.tooltip.firstChange) {
      this.initTooltip();
    }
  }

  ngAfterViewInit(): void {
    this.initTooltip();
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

  emitChangeEvent(e: any) {
    this.check();
    this._onChange(this.value)
    this.changeEvent.emit(e);
  }

  check() {
    if (this.validate) {
      let val = this.validate(this.value);
      this.isValid = val.status;
      this.validateMessage = val.message;
      return val.status == StatusType.Success;
    }
    return undefined;
  }

  private initTooltip() {
    if (this.tooltip) {
      // After ViewChild init
      setTimeout(() => {
        $(this.tooltipElement.nativeElement)
          .tooltip('dispose')
          .tooltip({ title: this.tooltip });
      }, 64);
    }
  }
}

