import { Component, Input } from '@angular/core';
import { CategoryInfo } from 'src/app/models/category/category-info';

@Component({
  selector: 'o-category-card',
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {
  @Input()
  public categoryInfo: CategoryInfo;
  constructor() { }
}
