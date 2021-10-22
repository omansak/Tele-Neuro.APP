import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared.components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { UpdateExerciseModalComponent } from './update-exercise-modal/update-exercise-modalcomponent';
import { ExerciseShowerModalComponent } from './exercise-shower-modal/exercise-shower-modal..component';
import { PipesModule } from 'src/app/pipes/pipes.module';
@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,

        //App
        ProgressbarModule.forRoot(),
        SharedComponentsModule,
        DirectivesModule,
        PipesModule
    ],
    exports: [UpdateExerciseModalComponent, ExerciseShowerModalComponent],
    declarations: [UpdateExerciseModalComponent, ExerciseShowerModalComponent]
})
export class ExerciseComponentsModule { }
