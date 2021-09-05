import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-category-card',
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {
  @Input()
  public isAdmin !: boolean;
}
