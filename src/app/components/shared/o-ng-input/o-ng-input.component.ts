import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StatusType } from 'src/app/consts/enums';

@Component({
  selector: 'o-ng-input',
  templateUrl: './o-ng-input.component.html',
  styleUrls: ['./o-ng-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ONgInputComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class ONgInputComponent implements ControlValueAccessor {
  //Inputs
  @Input()
  public header: string;
  @Input()
  public description: string;
  @Input()
  public placeholder: string;
  @Input()
  public type: "text" | "number" | "tel" = "text";
  @Input()
  public containerClass: string;
  @Input()
  public inputClass: string;
  @Input()
  public prefixIcon: string;
  @Input()
  public suffixIcon: string;
  @Input()
  public disabled: boolean = false;
  // Outputs
  @Output('change')
  public changeEvent = new EventEmitter();
  @Output('keyup')
  public keyUpEvent = new EventEmitter();
  @Input()
  public isLoading: boolean = false;
  @Input()
  public validate: (value: any) => { status: StatusType | undefined | null, message?: string | undefined | null };
  // Publics
  public value: any;
  public isValid: StatusType | undefined | null = undefined;
  public validateMessage: string | undefined | null = undefined;
  // Privates
  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;
  constructor() { }

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

  emitKeyUpEvent(e: any) {
    this.keyUpEvent.emit(e);
  }

  emitFocusEvent() {
    this._onTouched();
  }

  check() {
    if (this.validate) {
      let val = this.validate(this.value);
      this.isValid = val.status;
      this.validateMessage = val.message;
      if (val.status == StatusType.Error) {
        this.inputElement.nativeElement.focus();
      }
      return val.status == StatusType.Success;
    }
    return undefined;
  }
}
