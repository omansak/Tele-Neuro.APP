import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { MENU_ADMIN } from 'src/app/consts/menu';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent implements AfterViewInit {

  public adminNavigation = MENU_ADMIN;
  public pageTitle!: string;
  
  constructor(router: Router, activatedRoute: ActivatedRoute) {
    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(i => {
        if (i.PageTitle) {
          this.pageTitle = i.PageTitle
        }
      });
  }

  ngAfterViewInit(): void {
    init();
  }
}
