import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared.components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { UpdateCategoryModalComponent } from './update-category-modal/update-category-modal.component';
import { CategoryCardComponent } from './category-card/category-card.component';
@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,

        //App
        ProgressbarModule.forRoot(),
        SharedComponentsModule,
        DirectivesModule
    ],
    exports: [UpdateCategoryModalComponent, CategoryCardComponent],
    declarations: [UpdateCategoryModalComponent, CategoryCardComponent]
})
export class CategoryComponentsModule { }
