import {Component, ViewEncapsulation} from '@angular/core';
import {ClassBinder} from "./services/class-binder.service";
import {InputComponent} from "./ui/components/input/input.component";

@Component({
  selector: 'fitg-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [InputComponent]
})
export class AppComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('fitg-root');
  }
}
