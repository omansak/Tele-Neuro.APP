import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ONgCheckboxComponent } from './o-ng-checkbox/o-ng-checkbox.component';
import { ONgCropperComponent } from './o-ng-cropper/o-ng-cropper.component';
import { ONgFileInputComponent } from './o-ng-file-input/o-ng-file-input.component';
import { ONgInputComponent } from './o-ng-input/o-ng-input.component';
import { ONgPaginatedViewComponent } from './o-ng-paginated-view/o-ng-paginated-view.component';
import { ONgPaginationNavbarComponent } from './o-ng-pagination-navbar/o-ng-pagination-navbar.component';
import { ONgSelectComponent } from './o-ng-select/o-ng-select.component';
import { ONgSwitchComponent } from './o-ng-switch/o-ng-switch.component';
import { ONgTextareaComponent } from './o-ng-textarea/o-ng-textarea.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule, // --> https://github.com/ng-select/ng-select
        ImageCropperModule // --> https://github.com/Mawi137/ngx-image-cropper
    ],
    exports: [
        ONgSelectComponent,
        ONgInputComponent,
        ONgTextareaComponent,
        ONgFileInputComponent,
        ONgCropperComponent,
        ONgPaginatedViewComponent,
        ONgCheckboxComponent,
        ONgSwitchComponent
    ],
    declarations: [
        ONgSelectComponent,
        ONgInputComponent,
        ONgTextareaComponent,
        ONgFileInputComponent,
        ONgCropperComponent,
        ONgPaginatedViewComponent,
        ONgPaginationNavbarComponent,
        ONgCheckboxComponent,
        ONgSwitchComponent
    ],
    providers: [],
})
export class SharedComponentsModule { }
