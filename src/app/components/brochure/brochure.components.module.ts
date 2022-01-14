import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared.components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UpdateBrochureModalComponent } from './update-brochure-modal/update-brochure-modal.component';
import { AssignUserModal } from './assign-user-modal/assign-user-modal.component';


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
    exports: [UpdateBrochureModalComponent, AssignUserModal],
    declarations: [UpdateBrochureModalComponent, AssignUserModal]
})
export class BrochureComponentsModule { }
