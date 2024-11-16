import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deal-input',
  templateUrl: './deal-input.component.html',
  styleUrls: ['./deal-input.component.scss'],
})
export class DealInputComponent {
  @Input() deal: any;
  constructor() {}
}
