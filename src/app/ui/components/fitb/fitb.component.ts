import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import {ClassBinder} from "../../../services/class-binder.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'ui-fitb',
  standalone: true,
  templateUrl: 'fitb.component.html',
  styleUrl: 'fitb.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule],
  providers: [ClassBinder]
})
export class SelectComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('ui-fitb');
  }
}
