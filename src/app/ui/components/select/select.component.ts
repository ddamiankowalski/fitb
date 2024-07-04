import {
  Component, effect,
  forwardRef, input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import {ClassBinder} from "../../../services/class-binder.service";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

interface ISelectOption {
  label: string;
}

type SelectOptions = ISelectOption[];

@Component({
  selector: 'ui-select',
  standalone: true,
  templateUrl: 'select.component.html',
  styleUrl: 'select.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, NgbDropdownModule],
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
 * Select component that implements a control value accessor in order to be able to use it inside
 * Angular ReactiveForms API (formgroup, formarray, formcontrol)
 */
export class SelectComponent implements ControlValueAccessor {
  /**
   * Input signal containing the placeholder for the select.
   */
  public placeholder = input<string>('This is a placeholder');

  /**
   * Input signal with the options to be displayed inside the component.
   */
  public options = input<SelectOptions>([]);

  /**
   * Selected option, initially null
   */
  public selected = signal<string | null>(null);

  /**
   * Signal indicating whether select input is disabled
   */
  public isDisabled = signal<boolean>(false);

  /**
   * Signal indicating whether select is focused
   */
  public isFocused = signal<boolean>(false);

  private _onChange!: (value: string) => void;
  private _onTouched!: (value: string) => void;

  constructor(private _classBinder: ClassBinder) {
    _classBinder.bind('ui-select');

    effect(() =>
      _classBinder.conditionalBind(this.isFocused() || !!this.selected(), 'ui-select--focused')
    );
  }

  public onOptionClick(option: string): void {
    this.selected.set(option);
  }

  /**
   * On open callaback that allows to react to open/close dropdown changes.
   *
   * @param isOpen
   */
  public onOpenChange(isOpen: boolean): void {
    this.isFocused.set(isOpen);
  }

  /**
   * Callback that is called when user focuses on the toggle button.
   */
  public onFocus(): void {
    this.isFocused.set(true);
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
