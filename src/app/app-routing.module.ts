import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { ROUTE, ROUTE_MANAGEMENT_CATEGORY } from './consts/routes';

const routes: Routes = [
  {
    path: ROUTE,
    component: BaseComponent,
    children: [
      {
        path: ROUTE_MANAGEMENT_CATEGORY,
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
