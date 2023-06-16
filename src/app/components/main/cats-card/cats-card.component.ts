import { Component, Input } from '@angular/core';
import { Cat } from 'src/app/models/cat.interface';

@Component({
  selector: 'app-cats-card',
  templateUrl: './cats-card.component.html',
  styleUrls: ['./cats-card.component.scss']
})
export class CatsCardComponent {

  @Input() cat!: Cat;
  
}
