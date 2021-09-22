import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StatusType } from 'src/app/consts/enums';
import { Helper } from 'src/app/helpers/helper';

@Component({
  selector: 'o-ng-checkbox',
  templateUrl: './o-ng-checkbox.component.html',
  styleUrls: ['./o-ng-checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ONgCheckboxComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class ONgCheckboxComponent implements ControlValueAccessor {
  //Inputs
  @Input()
  public header: string;
  @Input()
  public description: string;
  @Input()
  public containerClass: string;
  @Input()
  public textareaClass: string;
  @Input()
  public isLoading: boolean = false;
  @Input()
  public validate: (value: any) => { status: StatusType | undefined | null, message?: string | undefined | null };

  // Outputs
  @Output('change')
  changeEvent = new EventEmitter();
  // Publics
  public value: any;
  public isValid: StatusType | undefined | null = undefined;
  public validateMessage: string | undefined | null = undefined;
  public elementKey = Helper.RandomString();
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
