import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_ROUTE } from 'src/app/consts/navigation';
import { CategoryInfo } from 'src/app/models/category/category-info';

@Component({
  selector: 'o-category-card',
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {
  @Input()
  public categoryInfo: CategoryInfo;
  constructor(private _router: Router) { }

  navigateCategory(e: any) {
    this._router.navigate([NAVIGATION_ROUTE.ROUTE_CATEGORY.Route.replace(':id', e)]);
  }
}
