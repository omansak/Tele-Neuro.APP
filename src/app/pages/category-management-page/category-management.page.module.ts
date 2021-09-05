import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE } from 'src/app/consts/routes';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { NAVIGATION_CATEGORY_MANAGEMENT } from 'src/app/consts/menu';
import { FormsModule } from '@angular/forms';
import { CategoryComponentsModule } from 'src/app/components/category/category.components.module';
import { CategoryManagementPage } from './category-management.page';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    // Route
    RouterModule.forChild([
      {
        path: ROUTE,
        component: CategoryManagementPage,
        data: NAVIGATION_CATEGORY_MANAGEMENT.Data
      }
    ]),
    // App
    SharedComponentsModule,
    CategoryComponentsModule
  ],
  exports: [],
  declarations: [CategoryManagementPage],
  providers: [],
})
export class CategoryManagementPageModule { }
