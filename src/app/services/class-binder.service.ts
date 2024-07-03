import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class ClassBinder {
  constructor(private elementRef: ElementRef) {}

  /**
   * Binds the CSS class to the host HTML element of the component
   * that the binder is provided in.
   *
   * @param className
   */
  public bind(className: string): void {
    this.elementRef.nativeElement.classList.add(className);
  }

  /**
   * Binds the CSS class with the exception that the condition must be true.
   *
   * @param condition
   * @param className
   */
  public conditionalBind(condition: boolean, className: string): void {
    condition
      ? this.elementRef.nativeElement.classList.add(className)
      : this.elementRef.nativeElement.classList.remove(className);
  }
}
