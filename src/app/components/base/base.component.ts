import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { CDN_JS_MAIN } from 'src/app/consts/cdns';
import { MENU_ADMIN } from 'src/app/consts/menu';
import { LazyLoaderService } from 'src/app/services/common/lazy-script-loader.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent implements AfterViewInit {

  public adminNavigation = MENU_ADMIN;
  public pageTitle!: string;

  constructor(router: Router, activatedRoute: ActivatedRoute, private _lazyLoaderService: LazyLoaderService) {
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
    this._lazyLoaderService.loadScript(CDN_JS_MAIN).subscribe(() => {
      init();
    });
  }
}
