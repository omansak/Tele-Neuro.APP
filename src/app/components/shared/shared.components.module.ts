import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LazyLoaderService } from 'src/app/services/common/lazy-script-loader.service';
import { ONgCropperComponent } from './o-ng-cropper/o-ng-cropper.component';
import { ONgFileInputComponent } from './o-ng-file-input/o-ng-file-input.component';
import { ONgInputComponent } from './o-ng-input/o-ng-input.component';
import { ONgSelectComponent } from './o-ng-select/o-ng-select.component';
import { ONgTextareaComponent } from './o-ng-textarea/o-ng-textarea.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgSelectModule, // --> https://github.com/ng-select/ng-select
        ImageCropperModule // --> https://github.com/Mawi137/ngx-image-cropper
    ],
    exports: [
        ONgSelectComponent,
        ONgInputComponent,
        ONgTextareaComponent,
        ONgFileInputComponent,
        ONgCropperComponent
    ],
    declarations: [
        ONgSelectComponent,
        ONgInputComponent,
        ONgTextareaComponent,
        ONgFileInputComponent,
        ONgCropperComponent
    ],
    providers: [],
})
export class SharedComponentsModule { }
