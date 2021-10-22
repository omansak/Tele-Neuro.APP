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
      },
      {
        path: NAVIGATION_ROUTE.ROUTE_EXERCISE_MANAGEMENT.Route,
        loadChildren: () => import('./pages/exercise-management-page/exercise-management.page.module').then(i => i.ExerciseManagementPageModule),
      },
      {
        path: NAVIGATION_ROUTE.ROUTE_PROGRAM_MANAGEMENT.Route,
        loadChildren: () => import('./pages/program-management-page/program-management.page.module').then(i => i.ProgramManagementPageModule),
      },
      {
        path: NAVIGATION_ROUTE.ROUTE_PROGRAM.Route,
        loadChildren: () => import('./pages/program-page/program.page.module').then(i => i.ProgramPageModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
