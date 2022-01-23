import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ROUTE, NAVIGATION_ROUTE } from 'src/app/consts/navigation';
import { UserManagementPage } from './user-management.page';
import { UpdateUserModalComponent } from 'src/app/components/user/update-user-modal/update-user-modalcomponent';
import { PipesModule } from 'src/app/pipes/pipes.module';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    // Route
    RouterModule.forChild([
      {
        path: ROUTE,
        component: UserManagementPage,
        data: NAVIGATION_ROUTE.ROUTE_USER_MANAGEMENT
      }
    ]),
    // App
    SharedComponentsModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [],
  declarations: [UserManagementPage, UpdateUserModalComponent],
  providers: [],
})
export class UserManagementPageModule { }
