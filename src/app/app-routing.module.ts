import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { NAVIGATION_ROUTE, ROUTE, ROUTE_FAULT } from './consts/navigation';
const routes: Routes = [
  {
    path: ROUTE,
    component: BaseComponent,
    children: [
      {
        path: ROUTE,
        loadChildren: () => import('./pages/dashboard-page/dashboard.page.module').then(i => i.DashboardPageModule),
      },
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
        path: NAVIGATION_ROUTE.ROUTE_USER_MANAGEMENT.Route,
        loadChildren: () => import('./pages/user-management-page/user-management.page.module').then(i => i.UserManagementPageModule),
      },
      {
        path: NAVIGATION_ROUTE.ROUTE_PROGRAM.Route,
        loadChildren: () => import('./pages/program-page/program.page.module').then(i => i.ProgramPageModule),
      },
      {
        path: NAVIGATION_ROUTE.ROUTE_PROGRAM_USER_MANAGEMENT.Route,
        loadChildren: () => import('./pages/program-user-management-page/program-user-management.page.module').then(i => i.ProgramUserManagementPageModule),
      },
    ]
  },
  {
    path: NAVIGATION_ROUTE.ROUTE_LOGIN.Route,
    loadChildren: () => import('./pages/login-page/login.page.module').then(i => i.LoginPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
