import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class ONgInputComponent implements OnInit, ControlValueAccessor {
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
  // Publics
  public value: any;
  // Privates
  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor() {
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

  emitKeyUpEvent(e: any) {
    this.keyUpEvent.emit(e);
  }
}
