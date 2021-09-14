import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PageInfo } from 'src/app/models/base-model';

@Component({
  selector: 'o-ng-pagination-navbar',
  templateUrl: './o-ng-pagination-navbar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ONgPaginationNavbarComponent {

  @Input()
  public pageInfo: PageInfo;

  @Output()
  public pageChanged: EventEmitter<number> = new EventEmitter<number>();

  public currentPage: number;
  constructor() {
    if (!this.pageInfo)
      this.pageInfo = new PageInfo(1);
    this.currentPage = this.pageInfo.Page;
  }

  changePage(e: number) {
    this.currentPage = e;
    this.pageChanged.emit(e);
  }
}
