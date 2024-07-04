import {
  Component, effect,
  ElementRef,
  forwardRef, Input,
  signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ClassBinder} from "../../../services/class-binder.service";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'ui-input',
  standalone: true,
  templateUrl: 'input.component.html',
  styleUrl: 'input.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule
  ],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    }
  ]
})
/**
 * Input component that implements a control value accessor in order to be able to use it inside
 * Angular ReactiveForms API (formgroup, formarray, formcontrol)
 */
export class InputComponent implements ControlValueAccessor {
  @ViewChild('inputEl', { read: ElementRef }) inputEl!: ElementRef;
  @Input() placeholder: string = 'This is a placeholder';

  public value = '';
  public isDisabled = signal<boolean>(false);

  private _onChange: (value: string) => void = () => {};
  private _onTouched: () => void = () => {};
  private _isPopulated = false;

  constructor(private _classBinder: ClassBinder) {
    _classBinder.bind('ui-input');
    this._setEditable();
  }

  get isPopulated(): boolean {
    return this._isPopulated;
  }

  /**
   * On focus callback.
   */
  public onFocus(): void {
    this._onTouched();
  }

  /**
   * Callback to be called when value changes.
   *
   * @param event
   */
  public onKeyDown(event: KeyboardEvent): void {
    if(!this._isValid(event)) {
      return;
    }

    this._isPopulated = true;
    if(!this.value.length) {
      this.inputEl.nativeElement.innerHTML = '';
      this.value = event.key;
      this._onChange(this.value);
      return;
    }

    setTimeout(() => {
      this.value = this.inputEl.nativeElement.innerHTML;
      this._onChange(this.value);
    })
  }

  /**
   * Simple validation so that the field does not react to keyboard events
   * that should not be registered such as Tab clicks
   *
   * @param event
   * @private
   */
  private _isValid(event: KeyboardEvent): boolean {
    return !['Tab'].includes(event.code);
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public setDisabledState(isDisabled: boolean) {
    this.isDisabled.set(isDisabled);
    this._classBinder.conditionalBind(isDisabled, 'ui-input--disabled');
  }

  public registerOnChange(fn: (value: string) => void) {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this._onTouched = fn;
  }

  /**
   * This function sets contentEditable attribute to the html element if it is not disabled.
   *
   * @private
   */
  private _setEditable(): void {
    effect(() => {
      const isDisabled = this.isDisabled();
      this.inputEl.nativeElement.contentEditable = isDisabled ? 'false' : 'true';
    });
  }

  protected readonly onfocus = onfocus;
}
