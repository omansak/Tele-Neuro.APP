import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
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
export class ONgSelectComponent implements OnInit, ControlValueAccessor {
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
  // Privates
  private _items: Array<any>;
  private _itemsAreUsed: boolean;
  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = LCL_SELECT_NOT_FOUND;
    this.config.loadingText = LCL_SELECT_LOADING;
    this.config.placeholder = LCL_SELECT_PLACEHOLDER;
    this.config.bindValue = 'value';
    this.config.bindLabel = 'text';
    //this.config.appendTo = 'body';
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
    this._onChange(this.value)
    this.changeEvent.emit(e);
  }

}
