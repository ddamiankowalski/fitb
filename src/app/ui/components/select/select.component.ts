import {
  Component,
  forwardRef,
  signal,
  ViewEncapsulation
} from '@angular/core';
import {ClassBinder} from "../../../services/class-binder.service";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'ui-select',
  standalone: true,
  templateUrl: 'select.component.html',
  styleUrl: 'select.component.scss.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    }
  ]
})
/**
 * Input component that implements a control value accessor in order to be able to use it inside
 * Angular ReactiveForms API (formgroup, formarray, formcontrol)
 */
export class SelectComponent implements ControlValueAccessor {
  public isDisabled = signal<boolean>(false);

  private _onChange!: (value: string) => void;
  private _onTouched!: (value: string) => void;

  constructor(private _classBinder: ClassBinder) {
    _classBinder.bind('ui-select');
  }

  public writeValue(value: string): void {}

  public setDisabledState(isDisabled: boolean) {
    this.isDisabled.set(isDisabled);
    this._classBinder.conditionalBind(isDisabled, 'ui-select--disabled');
  }

  public registerOnChange(fn: (value: string) => void) {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this._onTouched = fn;
  }
}
