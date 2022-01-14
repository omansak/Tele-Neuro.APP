import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ROUTE, NAVIGATION_ROUTE } from 'src/app/consts/navigation';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ToastService } from 'src/app/services/common/toastr-service';
import { BrochureService } from 'src/app/services/brochure/brochure-service';
import { BrochureManagementPage } from './brochure-management.page';
import { ExerciseService } from 'src/app/services/exercise/exercise-service';
import { BrochureComponentsModule } from 'src/app/components/brochure/brochure.components.module';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    // Route
    RouterModule.forChild([
      {
        path: ROUTE,
        component: BrochureManagementPage,
        data: NAVIGATION_ROUTE.ROUTE_BROCHURE_MANAGEMENT
      }
    ]),
    // App
    SharedComponentsModule,
    BrochureComponentsModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [],
  declarations: [BrochureManagementPage],
  providers: [ToastService, BrochureService, ExerciseService],
})
export class BrochureManagementPageModule { }
