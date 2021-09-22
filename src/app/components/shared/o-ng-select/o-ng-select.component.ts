import { AfterViewInit, Component, ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { StatusType } from 'src/app/consts/enums';
import { LCL_SELECT_LOADING, LCL_SELECT_NOT_FOUND, LCL_SELECT_PLACEHOLDER } from 'src/app/consts/locales';

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
export class ONgSelectComponent implements OnInit, ControlValueAccessor, AfterViewInit {
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
  public header: string;
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
    this._itemsAreUsed = true;
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
  private _itemsAreUsed: boolean;
  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  @ContentChild("optionTemplate", { read: TemplateRef }) optionTemplate: TemplateRef<any>;
  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = LCL_SELECT_NOT_FOUND;
    this.config.loadingText = LCL_SELECT_LOADING;
    this.config.placeholder = LCL_SELECT_PLACEHOLDER;
    this.config.bindValue = 'value';
    this.config.bindLabel = 'text';
    //this.config.appendTo = 'body';
  }
  ngAfterViewInit(): void {

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
}

