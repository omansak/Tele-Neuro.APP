import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'o-ng-textarea',
  templateUrl: './o-ng-textarea.component.html',
  styleUrls: ['./o-ng-textarea.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ONgTextareaComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class ONgTextareaComponent implements OnInit, ControlValueAccessor {
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
  public textareaClass: string;
  @Input()
  public rows: number;
  @Input()
  public resize: boolean = false;

  // Outputs
  @Output('change')
  changeEvent = new EventEmitter();
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

}
