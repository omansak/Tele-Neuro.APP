import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared.components.module';

@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,
        ModalModule.forChild(),

        //App
        SharedComponentsModule
    ],
    exports: [AddCategoryModalComponent],
    declarations: [AddCategoryModalComponent],
    providers: [],
})
export class CategoryComponentsModule { }
