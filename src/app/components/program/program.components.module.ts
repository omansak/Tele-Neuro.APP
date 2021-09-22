import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared.components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { UpdateProgramModalComponent } from './update-program-modal/update-program-modal.component';

@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,

        //App
        SharedComponentsModule,
        DirectivesModule
    ],
    exports: [UpdateProgramModalComponent],
    declarations: [UpdateProgramModalComponent]
})
export class ProgramComponentsModule { }
