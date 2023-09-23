import { Component, Input } from '@angular/core';
import { ChildObj } from '../child/child';

@Component({
  selector: 'app-sub-child',
  templateUrl: './sub-child.component.html',
  styleUrls: ['./sub-child.component.scss']
})
export class SubChildComponent {
  @Input() child!: ChildObj;

  constructor() {}
}
