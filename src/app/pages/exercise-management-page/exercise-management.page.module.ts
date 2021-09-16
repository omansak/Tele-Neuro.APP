import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ROUTE, NAVIGATION_ROUTE } from 'src/app/consts/navigation';
import { ExerciseManagementPage } from './exercise-management.page';
import { ExerciseComponentsModule } from 'src/app/components/exercise/exercise.components.module';
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
        component: ExerciseManagementPage,
        data: NAVIGATION_ROUTE.ROUTE_EXERCISE_MANAGEMENT
      }
    ]),
    // App
    SharedComponentsModule,
    ExerciseComponentsModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [],
  declarations: [ExerciseManagementPage],
  providers: [],
})
export class ExerciseManagementPageModule { }
