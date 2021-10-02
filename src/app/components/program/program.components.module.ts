import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared.components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { UpdateProgramModalComponent } from './update-program-modal/update-program-modal.component';
import { UpdateExerciseOfProgramModalComponent } from './update-exercise-of-program-modal/update-exercise-of-program-modal.component';
import { AssignedExercisesModal } from './assigned-exercises-modal/assigned-exercises-modal.component';

@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,

        //App
        SharedComponentsModule,
        DirectivesModule
    ],
    exports: [UpdateProgramModalComponent, UpdateExerciseOfProgramModalComponent, AssignedExercisesModal],
    declarations: [UpdateProgramModalComponent, UpdateExerciseOfProgramModalComponent, AssignedExercisesModal]
})
export class ProgramComponentsModule { }
