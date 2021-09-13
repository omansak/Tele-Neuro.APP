import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { NAVIGATION_ROUTE, ROUTE } from './consts/navigation';
const routes: Routes = [
  {
    path: ROUTE,
    component: BaseComponent,
    children: [
      {
        path: NAVIGATION_ROUTE.ROUTE_CATEGORY_MANAGEMENT.Route,
        loadChildren: () => import('./pages/category-management-page/category-management.page.module').then(i => i.CategoryManagementPageModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
